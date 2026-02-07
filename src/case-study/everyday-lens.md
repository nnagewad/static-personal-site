---
order: 1
layout: 'layouts/case-study.njk'
title:
  Everyday Lens
metaDesc: 'update'
image: home
imageAltText:
  3D animated emoji of a friendly and approachable person with a black tuque, glasses, and a beard
subTitle:
  Building a personal publishing system with AI collaboration
---
<div class="intro">
  <p>Summer of 2025 I built <a href="https://everydaylens.photos">Everyday Lens</a>. Rather than just using AI to help me build out the publishing pipeline I was curious how I could use AI as a collaborator as well.</p>
</div>

<section>
  <h2 class="font-size-3">Design judgment</h2>
  <p>Built on my own time, by myself, the goal was to build something that would last and that I will as my primary outlet of sharing my photography for the foreseeable future. Therefore, the system must be easy to upload photos, and the AI must be a valuable collaborator rather than a replacement for my creative decisions.</p>
</section>

<section>
  <h2 class="font-size-3">Design decisions</h2>
  <h3 class="font-size-2">Automation first</h3>
  <p>A script detects new photos, extracts camera metadata, and triggers AI-generated titles, alt text, and tags—reducing publishing time from 10 minutes (manually entering all the metadata) to under 60 seconds.</p>
  
  <h3 class="font-size-2">AI with guardrails</h3>
  <p>Although Claude does a great job in coming up with a unique title, alt text and tags I made the deliberate choice to review its output. The review step keeps my voice in the work.</p>
  
  <h3 class="font-size-2">Multi-channel distribution</h3>
  <p>Clean URLs, Open Graph previews, and RSS feeds. Anyone can access and subscribe without signing up to a social media platform.</p>
  
  <h3 class="font-size-2">Utilitarian design aesthetic</h3>
  <p>The command-line interface aesthetic wasn't just a style choice. It reflected what the tool actually is: something quiet, utilitarian, running in the background doing its job. No flashy interface: clean typography, high contrast colours. Ultimately, the photos take front and center.</p>


  <h3 class="font-size-2">Built with accessibilty in mind</h3>
  <p>Inspired by my work at GDS, from day-one, this site was built with all end-users in mind. Therefore, the colours abide colour contrast accessibiltiy standards, the font size is legible even for the hard of sight, and it's possible to navigate using only a keyboard.</p>
</section>

<section>
  <h2 class="font-size-3">Impact</h2>
  <ul class="list-extra-space ">
    <li><strong>80% AI accuracy baseline</strong> established for creative metadata generation</li>
    <li><strong>90+ Lighthouse scores</strong> across performance, accessibility, and SEO</li>
    <li><strong>Influenced how I think about AI as a collaborator</strong>, clearly showing where it can add value and where human judgment is irreplaceable</li>
  </ul>
</section>
