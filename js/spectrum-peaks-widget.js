function initSpectrumPeaksWidget() {
    if (!window.AudioContext && !window.webkitAudioContext) {
        return;
    }

    var isSupportedPostPage = /harmonic-monochord-(improvisations)/.test(window.location.pathname);
    if (!isSupportedPostPage) {
        return;
    }

    if (document.getElementById("spectrum-peaks-widget")) {
        return;
    }

    var audioElements = document.querySelectorAll("audio");

    var AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContextCtor();
    var audioStateMap = new Map();
    var currentAudio = null;
    var d3FrequencyHz = 146.832;
    var maxHarmonicRank = 16;
    var centsTolerance = 15;

    var panel = document.createElement("div");
    panel.id = "spectrum-peaks-widget";
    panel.style.position = "fixed";
    panel.style.top = "88px";
    panel.style.right = "16px";
    panel.style.bottom = "auto";
    panel.style.zIndex = "1";
    panel.style.width = "200px";
    panel.style.padding = "8px";
    panel.style.background = "transparent";
    panel.style.color = "#000";
    panel.style.fontFamily = "'Avenir Next', 'Segoe UI', sans-serif";
    panel.style.fontSize = "12px";
    panel.style.lineHeight = "1.4";
    panel.style.boxShadow = "none";
    panel.style.pointerEvents = "none";

    var spiralCanvas = document.createElement("canvas");
    spiralCanvas.width = 200;
    spiralCanvas.height = 200;
    spiralCanvas.style.width = "200px";
    spiralCanvas.style.height = "200px";
    spiralCanvas.style.display = "block";

    panel.appendChild(spiralCanvas);
    document.body.appendChild(panel);

    var pageContent = document.querySelector("main.page-content");
    if (pageContent) {
        pageContent.style.position = "relative";
        pageContent.style.zIndex = "2";
    }

    // Keep the small header menu above the content stacking context.
    var siteHeader = document.querySelector("header.site-header");
    if (siteHeader) {
        siteHeader.style.position = "relative";
        siteHeader.style.zIndex = "4";
    }

    function updateWidgetSize() {
        var pageWidth = document.documentElement.clientWidth || window.innerWidth || 1000;
        var computedSize = Math.round(pageWidth * 0.30);
        var clampedSize = Math.max(150, Math.min(300, computedSize));

        panel.style.width = clampedSize + "px";
        spiralCanvas.width = clampedSize;
        spiralCanvas.height = clampedSize;
        spiralCanvas.style.width = clampedSize + "px";
        spiralCanvas.style.height = clampedSize + "px";
    }

    updateWidgetSize();
    window.addEventListener("resize", updateWidgetSize);

    function getAudioLabel(audioElement) {
        var src = audioElement.currentSrc || audioElement.src || "";
        if (!src) {
            return "Unknown source";
        }
        var srcPath = src.split("/");
        return decodeURIComponent(srcPath[srcPath.length - 1]);
    }

    function clearPeaks() {
        renderAnalysisRepresentation([]);
    }

    function getSpiralPosition(rank, width, height) {
        var cx = width / 2;
        var cy = height / 2;
        var padding = 18;
        var radiusMin = 12;
        var radiusMax = Math.min(width, height) / 2 - padding;
        var thetaMax = 2 * Math.PI * Math.log2(maxHarmonicRank);
        var theta = 2 * Math.PI * Math.log2(rank);
        var rotatedTheta = theta - (Math.PI / 2);
        var radius = radiusMin + (radiusMax - radiusMin) * (theta / thetaMax);

        return {
            x: cx + radius * Math.cos(rotatedTheta),
            y: cy + radius * Math.sin(rotatedTheta)
        };
    }

    function getSpiralArmSpacing(width, height) {
        var padding = 18;
        var radiusMin = 12;
        var radiusMax = Math.min(width, height) / 2 - padding;
        var thetaMax = 2 * Math.PI * Math.log2(maxHarmonicRank);
        var radiusGrowthPerRadian = (radiusMax - radiusMin) / thetaMax;

        return radiusGrowthPerRadian * 2 * Math.PI;
    }

    function renderAnalysisRepresentation(harmonicPeaks) {
        var ctx = spiralCanvas.getContext("2d");
        var width = spiralCanvas.width;
        var height = spiralCanvas.height;
        var thetaMax = 2 * Math.PI * Math.log2(maxHarmonicRank);
        var pointCount = 500;
        var armSpacing = getSpiralArmSpacing(width, height);
        var maxDotDiameter = Math.max(2, armSpacing * 0.9);
        var maxDetectedAmplitude = 0;

        for (var a = 0; a < harmonicPeaks.length; a++) {
            if (harmonicPeaks[a].amplitude > maxDetectedAmplitude) {
                maxDetectedAmplitude = harmonicPeaks[a].amplitude;
            }
        }

        ctx.clearRect(0, 0, width, height);

        // Draw harmonic spiral baseline.
        ctx.beginPath();
        for (var i = 0; i <= pointCount; i++) {
            var rankEquivalent = Math.pow(2, (i / pointCount) * Math.log2(maxHarmonicRank));
            var position = getSpiralPosition(rankEquivalent, width, height);
            if (i === 0) {
                ctx.moveTo(position.x, position.y);
            }
            else {
                ctx.lineTo(position.x, position.y);
            }
        }
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw matched harmonic peaks as red dots sized by amplitude.
        for (var j = 0; j < harmonicPeaks.length; j++) {
            var peak = harmonicPeaks[j];
            var dotPosition = getSpiralPosition(peak.rank, width, height);
            var normalizedAmplitude = 0;
            if (maxDetectedAmplitude > 0) {
                normalizedAmplitude = peak.amplitude / maxDetectedAmplitude;
            }
            var perceptualAmplitude = Math.pow(normalizedAmplitude, 0.75);
            var requestedDiameter = perceptualAmplitude * 20;
            var dotDiameter = Math.max(2, Math.min(requestedDiameter, maxDotDiameter));

            ctx.beginPath();
            ctx.arc(dotPosition.x, dotPosition.y, dotDiameter / 2, 0, 2 * Math.PI);
            ctx.fillStyle = "#d60000";
            ctx.fill();

        }

        // Always draw harmonic rank labels (1-16) so they remain visible without audio.
        var rankFontSize = Math.max(11, Math.min(18, Math.round(width * 0.066)));
        var yPadding = rankFontSize * 0.6;

        ctx.fillStyle = "#000";
        ctx.font = rankFontSize + "px 'Avenir Next', 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (var l = 1; l <= maxHarmonicRank; l++) {
            var labelPosition = getSpiralPosition(l, width, height);
            var labelY = Math.max(yPadding, Math.min(height - yPadding, labelPosition.y));
            ctx.fillText(String(l), labelPosition.x, labelY);
        }
    }

    function centsDifference(frequency, referenceFrequency) {
        return 1200 * Math.log2(frequency / referenceFrequency);
    }

    function estimatePeakFrequency(freqData, binIndex, sampleRate, fftSize) {
        var left = freqData[binIndex - 1];
        var center = freqData[binIndex];
        var right = freqData[binIndex + 1];
        var denominator = (left - (2 * center) + right);
        var offset = 0;

        if (denominator !== 0) {
            offset = 0.5 * (left - right) / denominator;
            if (offset > 1) {
                offset = 1;
            }
            if (offset < -1) {
                offset = -1;
            }
        }

        return (binIndex + offset) * sampleRate / fftSize;
    }

    function getLocalMaximaPeaks(freqData, sampleRate, fftSize) {
        var binHz = sampleRate / fftSize;
        var minima = 18;
        var peaks = [];

        for (var i = 2; i < freqData.length - 2; i++) {
            var value = freqData[i];
            if (value < minima) {
                continue;
            }

            if (value > freqData[i - 1] && value >= freqData[i + 1]) {
                var frequency = estimatePeakFrequency(freqData, i, sampleRate, fftSize);
                if (frequency >= 20) {
                    peaks.push({
                        bin: i,
                        frequency: frequency,
                        amplitude: value
                    });
                }
            }
        }

        peaks.sort(function(a, b) {
            return b.amplitude - a.amplitude;
        });

        return peaks;
    }

    function getD3HarmonicPeaks(peaks) {
        var matched = [];

        for (var rank = 1; rank <= maxHarmonicRank; rank++) {
            var targetFrequency = d3FrequencyHz * rank;
            var bestCandidate = null;

            for (var i = 0; i < peaks.length; i++) {
                var candidate = peaks[i];
                var cents = centsDifference(candidate.frequency, targetFrequency);

                if (Math.abs(cents) <= centsTolerance) {
                    if (!bestCandidate || candidate.amplitude > bestCandidate.amplitude) {
                        bestCandidate = {
                            rank: rank,
                            frequency: candidate.frequency,
                            amplitude: candidate.amplitude,
                            cents: cents
                        };
                    }
                }
            }

            if (bestCandidate) {
                matched.push(bestCandidate);
            }
        }

        return matched;
    }

    function ensureAudioGraph(audioElement) {
        if (audioStateMap.has(audioElement)) {
            return audioStateMap.get(audioElement);
        }

        var source = audioContext.createMediaElementSource(audioElement);
        var analyser = audioContext.createAnalyser();
        analyser.fftSize = 32768;
        analyser.smoothingTimeConstant = 0.7;

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        var state = {
            analyser: analyser,
            buffer: new Uint8Array(analyser.frequencyBinCount)
        };

        audioStateMap.set(audioElement, state);
        return state;
    }

    function updateCurrentAudioFallback() {
        if (currentAudio && !currentAudio.paused && !currentAudio.ended) {
            return;
        }

        currentAudio = null;

        audioStateMap.forEach(function(_value, audioElement) {
            if (!currentAudio && !audioElement.paused && !audioElement.ended) {
                currentAudio = audioElement;
            }
        });
    }

    function handleAudioPlay(audioElement) {
        ensureAudioGraph(audioElement);
        currentAudio = audioElement;

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }
    }

    function registerAudio(audioElement) {
        if (audioElement.dataset.spectrumWidgetAttached === "true") {
            return;
        }

        audioElement.dataset.spectrumWidgetAttached = "true";

        audioElement.addEventListener("play", function() {
            handleAudioPlay(audioElement);
        });

        audioElement.addEventListener("pause", function() {
            updateCurrentAudioFallback();
            if (!currentAudio) {
                clearPeaks();
            }
        });

        audioElement.addEventListener("ended", function() {
            updateCurrentAudioFallback();
            if (!currentAudio) {
                clearPeaks();
            }
        });

        if (!audioElement.paused && !audioElement.ended) {
            handleAudioPlay(audioElement);
        }
    }

    for (var i = 0; i < audioElements.length; i++) {
        registerAudio(audioElements[i]);
    }

    var mutationObserver = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var node = mutation.addedNodes[j];
                if (node.nodeType !== 1) {
                    continue;
                }
                if (node.matches && node.matches("audio")) {
                    registerAudio(node);
                }
                if (node.querySelectorAll) {
                    var nestedAudios = node.querySelectorAll("audio");
                    for (var k = 0; k < nestedAudios.length; k++) {
                        registerAudio(nestedAudios[k]);
                    }
                }
            }
        }
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    function renderLoop() {
        updateCurrentAudioFallback();

        if (!currentAudio) {
            renderAnalysisRepresentation([]);
            window.requestAnimationFrame(renderLoop);
            return;
        }

        var state = ensureAudioGraph(currentAudio);
        state.analyser.getByteFrequencyData(state.buffer);
        var localPeaks = getLocalMaximaPeaks(
            state.buffer,
            audioContext.sampleRate,
            state.analyser.fftSize
        );
        var peaks = getD3HarmonicPeaks(localPeaks);
        renderAnalysisRepresentation(peaks);

        window.requestAnimationFrame(renderLoop);
    }

    renderLoop();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSpectrumPeaksWidget);
}
else {
    initSpectrumPeaksWidget();
}
