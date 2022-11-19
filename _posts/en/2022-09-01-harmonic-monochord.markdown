---
layout: post
title:  "Harmonic Monochord"
date:   2022-09-01 23:28:40 +0200
categories: instrument building
visible: 1
lang: en
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
The sound created is acoustic, and does not involve any pickup system.

<p>&nbsp;</p>

### Recordings

Here are a few recordings exploring a combination of a "bass" harmonic used as a root note and various subsets of the harmonic series. For those recordings the string was tuned to the frequency of 128 Hz. The numbers preceeding the recordings represent the pair of harmonics used. For instance, 2-3 means harmonic #2 and harmonic #3.

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
    7-2 | 7-4 | 7-6 | 7-8 | 7-10 | 7-12 | 7-14
    <br> 
    <audio src="/assets/sounds/ZOOM0037_corrected.mp3" controls></audio>
    <br>
    <br>
    8-6 | 8-9 | 8-10 | 8-12 | 8-14 <- 
    <br>
    <audio src="/assets/sounds/ZOOM0038_corrected.mp3" controls></audio>
</p>

It can be heard quite distinctly that some combinations are mutually reinforcing while some other have the tendency to cancel each other out.

<p>&nbsp;</p>

### Working principles

![alt text](/assets/images/monochord_5.png "monochord pic 5")

The electromagnets are driven by pulse-width modulated signals. The concept here is different from the  well-kown E-bows, which are using a feedback-loop. There are a few benefits from using a direct PWM excitation :
- the string enters much faster in resonance
- the string can vibrate at potentially any of its resonance mode or any combination of modes.

The downside being of course that the frequencies must be known by the system, hence the need for tuning potentiometers.

<p>&nbsp;</p>

### Electromagnets 

<p class="single-image">
  <img src="/assets/images/monochord_7.png" />
</p>

The electromagnets are either placed on antinodes in order to have the maximum effect on modes, or in places which are less optimal but allow the simultaneous excitation of several modes. I had to find an acceptable compromise given the hardware limitation of 5 electromagnets and the idea of exciting every single harmonic from 1 to 16. Placing an electromagnet very close to a string's ending could have gaven access to many harmonics from one place, but unfortunately didn't yield to good results, most likely because of the string inertia being stronger close to its edges.

<p class="single-image">
  <img src="/assets/images/monochord_onlg_3_hor.png" />
</p>

The electromagnets distance to the string can be adjusted for each one of them. The general idea is to bring them as close as possible to the string, but making sure that the string never touches them (the lower modes being stronger, the amplitude of vibration is naturally bigger).

<p>&nbsp;</p>

### Tuning potentiometers

<p class="single-image">
  <img src="/assets/images/monochord_8.png" />
</p>

This instrument is good to experience in a very practical manner the inharmonicity of a string. 

String inharmonicity means that the frequency of a given harmonic does not match exactly the harmonic serie.
For example, if the string is tuned precisely to 128 Hz, one would expect that the second harmonic would be at 2 * 128 = 256 Hz. Because of the way the string is built, and the physical properties of its materials, it would in real life be slightly off, by a few cents.

Each harmonic has a dedicated potentiometer which are slightly detuning each PWM wave to match the actual harmonic frequencies.

The process of tuning is interesting because one can clearly hear how far a given harmonic is from the perfect harmonic serie. Thanks to the forced resonance induced by the electromagnetic field beating against the natural string mode, the closer you get, the slower the beating becomes until a "perfect" match is reached and a sudden burst of energy can be heard in the sound. 

Detuning the string, even by a few cents has a strong impact on the inharmonicity pattern, and I could not derive any obvious law that could predict this behavior. I could also observe that this pattern is changing in the first minutes after detuning the string, and stabilizes itself after a little while. Moreover, as one would expect from a wooden instrument, any change in the room's temperature and humidity has a noticeable effect on the inharmonicity, through the wood play and the slight detuning of the whole string.

From the electronics perspective, the system is calibrated to give a theoretical tuning resolution always below the cent. 
In practice it's evolving along frequencies due to the microcontroller's design. The interplay between the internal prescalers used to divide down the main clock and the Timers bit depth force the PWM frequency resolution to be unequal.

In the current version, the detuning range goes from -5 to +5 cents. While experimenting, I observed that for certain strings of smaller diameter, as well as for some without extra-winding the inharmonicity tended to be more important, sometimes up to +40cents. So by choosing the string carefully I could reduce the tuning range and increase the tuning precision.

The string itself can be tuned via two pegs, one for coarse and one for fine tuning.

<p class="single-image-80">
  <img src="/assets/images/monochord_10.png" />
</p>

The instrument needs to be powered by an external 15V batterie / AC adapter.