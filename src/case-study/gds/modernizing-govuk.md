---
order: 1
layout: 'layouts/case-study.njk'
title:
  Modernizing GOV.UK
subTitle:
  Introducing large imagery to GOV.UK while keeping it accessible and scalable for 2,000+ publishers
metaDesc:
  Add
opengraphImage:
  caseStudy_gds
opengraphImageAltText:
  Illustration of a bearded man with glasses beside the "Government Digital Service" logo.
---
<div class="intro">
  <p>GOV.UK has maintained a utilitarian design aesthetic since its inception. Underneath the hood it's powered by Whitehall Publisher, a CMS used by 2,000+ publishers across 400+ government bodies. The system was rigid: departments were hiring external agencies, using taxpayer's money, to develop bespoke sites to achieve visual flexibility. I led the design effort to introduce large imagery as a first step toward a modern GOV.UK.</p>
</div>

<section>
  <h2 class="font-size-3">Design judgment</h2>
  <p>Legibility had to be guaranteed regardless of what image a publisher uploaded, as the outcome has to be accessible to anyone visiting GOV.UK. The solution also had to work at scale: 2,000+ publishers uploading images independently, with little to no developer intervention.</p>
</section>

<section>
  <h2 class="font-size-3">Design decisions</h2>
  <section>
    <h3 class="font-size-2">Running two workshops to find direction</h3>
    <p>I ran a design charrette with developers, researchers, product managers, and product leads across the GOV.UK frontend and Whitehall Publisher teams, followed by a sketching session with content designers from across government. Both groups, independently, surfaced the same themes: flexible layouts, personalisation, embeddable media, and more visual character, which pointed to large imagery as the first step towards modern and flexible GOV.UK.</p>
    <figure>
      <div class="side-by-side-images">
        <div>
          <small>Figure 1</small>
          <img src="../visuals/charette.png" alt="Collage of hand-drawn sketches showing layout and design ideas with notes on flexibility and customization.">
        </div>
        <div>
          <small>Figure 2</small>
          <img src="../visuals/sketchingSession.jpg" alt="Group of people at a table engaged in discussion in a conference room.">
        </div>
      </div>
      <figcaption>Figure 1: Samples from the design charrette (workshop 1). Figure 2: Participants from the sketching session (workshop 2).</figcaption>
    </figure>
  </section>
  <section>
    <h3 class="font-size-2">Audit before ideation</h3>
    <p>Before opening Figma, I audited how large imagery had already been handled across GOV.UK. Many visually compelling examples failed on closer inspection. For instance: text over images, page titles rendered as imagery, floating text boxes obscuring the image itself. These failures defined the constraints the design had to solve.</p>
    <figure>
      <img src="../visuals/audit.png" alt="Web page audit overview with thumbnails of screenshots from various UK government sites, categorized by projects and years.">
      <figcaption>Audit of large imagery across GOV.UK.</figcaption>
    </figure>
  </section>
  <section>
    <h3 class="font-size-2">First principle</h3>
    <p>It became apparent that text would be in front of a solid colour background, never over an image. On desktop it sits to the left of the image; on mobile, above it, both consistent with GOV.UK's existing reading flow.</p>
    <p>I explored the inverse layout but rejected it. It created real barriers for users with motor impairments on mobile and those with limited sight on desktop, a finding confirmed by in-house accessibility specialists.</p>
    <figure>
      <img src="../visuals/desktop+mobileConcepts.png" alt="">
      <figcaption>Proposed skeletal designs of component, desktop (left) and mobile (right) variations.</figcaption>
    </figure>
  </section>
  <section>
    <h3 class="font-size-2">Built to handle every real-world scenario</h3>
    <p>I tested the component with photographs, logos, and no imagery. Each variation had to work so publishers could use it with confidence and without developer intervention.</p>
    <figure>
      <div class="three-images">
        <div>
          <small>Figure 3</small>
          <img src="../visuals/samplePhoto.png" alt="Blue panel with GOV.UK logo and text beside a blurred group of people in a meeting setting.">
        </div>
        <div>
          <small>Figure 4</small>
          <img src="../visuals/sampleGraphic.png" alt="Illustration of two cartoon figures with a magnifying glass and question mark on a blue background, accompanied by placeholder text and the GOV.UK logo.">
        </div>
        <div>
          <small>Figure 5</small>
          <img src="../visuals/sampleTextOnly.png" alt="Blue banner with GOV.UK logo and placeholder text.">
        </div>
      </div>
      <figcaption>Figure 3: Example with photo. Figure 4: Example with a graphic. Figure 5: Example with no imagery.</figcaption>
    </figure>
  </section>
  <section>
    <h3 class="font-size-2">Header background colour as department identity</h3>
    <p>While solving for legibility I identified an opportunity: a customisable background colour would let departments express their visual identity without bespoke sites. Every pairing was drawn from the GOV.UK Design System and tested against AA contrast standards.</p>
    <figure>
      <img src="../visuals/colourSamples.png" alt='Grid of colored variations of the proposed header with "GOV.UK" logo and placeholder text.'>
      <figcaption>Birds-eye view of all colours available.</figcaption>
    </figure>
  </section>
  <section>
    <h3 class="font-size-2">Design shaped by developer collaboration</h3>
    <p>A developer suggested replacing my CSS background image approach with a picture tag, loading the appropriate asset based on the user's viewport and screen density. That led to capping the header at 1024px on desktop and setting a minimum height to prevent awkward cropping on content-light pages.</p>
    <p>On the backend, the publishing tool, I also separated the upload journey into photograph and logo paths, and updated the cropping tool to preview both desktop and mobile in real time.</p>
    <figure>
      <img src="../visuals/proposedOutput.png" alt="A webpage display on a smartphone and laptop about the 80th anniversaries of VE Day and VJ Day, with a black-and-white photo of people celebrating.">
      <figcaption>Component shown on desktop and mobile, with updated width cap and minimum height applied.</figcaption>
    </figure>
  </section>
  <section>
    <h3 class="font-size-2">User testing</h3>
    <p>Publishers tested the full flow via Figma prototypes. The standout finding: participants said if this capability had existed, they wouldn't have considered commissioning a bespoke site. Testing also surfaced appetite for a broader colour palette. This revealed a deeper access and permissions challenge now actively being worked on.</p>
    <figure>
      <img src="../visuals/figmaUR.png" alt="Wireframe of user testing flow for webpage customization involving header and logo image placements.">
      <figcaption>Screenshot of Figma file used for user testing.</figcaption>
    </figure>
  </section>
</section>

<section>
  <h2 class="font-size-3">Impact</h2>
  <ul class="list-extra-space">
    <li>Component went live in late March 2026. Publishers can upload imagery without developer intervention</li>
    <li>Applied to live GOV.UK pages: Topical Events, with expansion to other content types underway</li>
    <li>Opened the door to multi-level navigation exploration and further flexibility across the publishing and end-user experience</li>
  </ul>
</section>