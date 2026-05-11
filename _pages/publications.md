---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% include base_path %}

You can also find my articles on <u><a href="https://scholar.google.com/citations?user=vrCwdE8AAAAJ&hl">my Google Scholar profile</a>.</u>

**Collaborations Map**

<iframe 
  src="{{ '/assets/maps/Garcia-CamposMA_collabMap.html' | relative_url }}" 
  width="100%" 
  height="500px" 
  style="border:none;">
</iframe>

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
