---
layout: post
title:  "Harmonic Monochord"
date:   2022-09-01 23:28:40 +0200
categories: instrument building
visible: 1
---

<style>
    .single-image {
        width: 100%;  
        margin-left: auto;
        margin-right: auto;
    }
    .single-image-80 {
        width: 80%;  
        margin-left: auto;
        margin-right: auto;
    }
</style>
    

![alt text](/assets/images/monochord_1.png "monochord pic 1")

<p>&nbsp;</p>

The harmonic monochord is an experiment involving a string and electromagnets. 

I was wondering if it was possible to make a string vibrate at its harmonic frequencies, using tuned electromagnetic fields. 

<p>&nbsp;</p>

![alt text](/assets/images/monochord_2.png "monochord pic 2")

<p>&nbsp;</p>

This instrument makes it possible to play the first 16 string harmonics individually, and up to 5 at the same time.

The intensity of each harmonic is changed by sliding your fingers on the small copper elements.

<p>&nbsp;</p>

![alt text](/assets/images/monochord_9.jpg "monochord pic 9")

<p>&nbsp;</p>

The string vibrations are further amplified by a wooden resonator made with flame maple and beech.
The sound is purely acoustic, not involving any pickup system.

<p>&nbsp;</p>

### Recordings

Here are a few recordings exploring a combination of a "bass" harmonic used as a root note and various subsets of the harmonic series: 

<p align="center">
    2-1 | 2-3 | 2-4 | 2-5 | 2-7 | 2-8 | 2-9 | 2-11 | 2-12 | 2-13 | 2-15 | 2-16
    <br>
    <audio src="/assets/sounds/ZOOM0032_corrected.mp3" controls></audio>
    <br>
    <br>
    3-2 | 3-3 | 3-6 | 3-10 | 3-12 | 3-13 | 3-14 | 3-15 | 3-16 
    <br>    
    <audio src="/assets/sounds/ZOOM0033_corrected.mp3" controls></audio>
    <br>
    <br>
    4-1 | 4-3 | 4-5 | 4-6 | 4-7 | 4-9 | 4-11 | 4-13 | 4-15 | 4-16 
    <br>
    <audio src="/assets/sounds/ZOOM0034_corrected.mp3" controls></audio>
    <br>
    <br>
    5-2 | 5-4 | 5-6 | 5-8 | 5-10 | 5-12 | 5-14 | 5-15 
    <br>
    <audio src="/assets/sounds/ZOOM0035_corrected.mp3" controls></audio>
    <br>
    <br>
    6-1 | 6-3 | 6-4 | 6-5 | 6-7 | 6-8 | 6-9 | 6-11 | 6-12 | 6-13 | 6-15 | 6-16 
    <br>
    <audio src="/assets/sounds/ZOOM0036_corrected.mp3" controls></audio>
    <br>
    <br>
    6-1 | 6-3 | 6-4 | 6-5 | 6-7 | 6-8 | 6-9 | 6-11 | 6-12 | 6-13 | 6-15 | 6-16 
    <br>
    <audio src="/assets/sounds/ZOOM0036_corrected.mp3" controls></audio>
    <br>
    <br>
    8-6 | 8-9 | 8-10 | 8-12 | 8-14 <- 
    <br>
    <audio src="/assets/sounds/ZOOM0038_corrected.mp3" controls></audio>
</p>

You can hear how certain harmonic pairs are naturally cancelling each other out, while some are actually reenforcing themselves, producing strong combinations.

<p>&nbsp;</p>

### Working principles

![alt text](/assets/images/monochord_5.png "monochord pic 5")

The electromagnets are driven by pulse-width modulated signals. The concept here is different from the  well-kown E-bows, which are using a feedback-loop. There are a few benefits from using a direct PWM excitation :
- the string enters much faster in resonance
- the string can vibrate at potentially any of its resonance mode or any combination of modes.

The downside being of course that the frequencies must be known by the system, hence the need for tuning potentiometers.

### Electromagnets 

<p class="single-image">
  <img src="/assets/images/monochord_7.png" />
</p>

The electromagnets are either placed on antinodes in order to have the maximum effect on modes, or in places which are less optimal but accomodate the excitation of several modes. I had to find a working combination, given the limitation of 5 electromagnets and the idea of exciting every single harmonic from 1 to 16. Placing an electromagnet very close to a string's ending was not so efficient even though many more modes would have been virtually available.

<p class="single-image">
  <img src="/assets/images/monochord_onlg_3_hor.png" />
</p>

The electromagnet's distance to the string can be adjusted individually, to bring them as close as possible to the string, but making sure that the string never touches them (the lower modes being stronger, the amplitude of vibration is naturally bigger).

### Tuning potentiometers

<p class="single-image">
  <img src="/assets/images/monochord_8.png" />
</p>

There is one fine-tuning potentiometer per harmonic. They allow a slight detuning of each PWM wave, in order to accomodate for the string natural inharmonicity.

The process of tuning is interesting because you can clearly hear how far a given harmonic is from the perfect sequence, thanks to the forced resonance induced by the electromagnetic field beating against the natural string mode. The closer you get, the slower the beating becomes until you reach a "perfect" match and hear a sudden burst of energy in the sound. 

This instrument is good to measure the inharmonicity of a string, and also observe how the inharmonicity pattern is shifting for different tunings. I could not observe any obvious pattern, and I'm actually wondering if anyone has ever investigated this, please contact me if you know anything.

The system is calibrated to give a theoretical tuning resolution always below the cent. 
In practice it's evolving along the frequencies due to the microcontroller limitations, mainly the internal prescalers used to divide down the main clock and the bit depth of the Timers used to generated the PWM signals.

In the current version, the detuning range goes from -5 to +5 cents. While experimenting, I observed that for certain strings of smaller diameter, and for some without extra-winding the inharmonicity tended to be more, sometimes up to +40cents. So by choosing the string carefully I can reduce the tuning range and increase the tuning precision.

The string itself can be tuned via two pegs, one for coarse and one for fine tuning.

<p class="single-image-80">
  <img src="/assets/images/monochord_10.png" />
</p>

The instrument needs to be powered by an external 15V batterie / AC adapter.