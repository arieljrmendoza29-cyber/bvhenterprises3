# Images

Image assets used throughout the site.

## Currently included

| Filename | Where it's used |
|----------|-----------------|
| `business-professionals.jpg` | Hero — right-side image (page-home) |
| `team-colleagues-tablet.jpg` | "Everything You Need" stacked section (hexagon image) |
| `digital-transformation.jpg` | "Real Results" section background |
| `it-consulting-team.jpg` | Spare / available for additional sections |

## Optional — add when you have them

| Filename | Usage | Recommended Size |
|----------|-------|-----------------|
| `BVH_Enterprises_logo_transparent_400w.png` | Site logo (navbar + footer) | 400px wide, transparent PNG |
| `ava-reynolds.jpg` | Testimonial / About photo | 400×400px |
| `catherine-weiss.jpg` | Testimonial / About photo | 400×400px |
| `david-okafor.jpg` | Testimonial / About photo | 400×400px |
| `james-harrington.jpg` | Testimonial photo | 400×400px |
| `michael-donovan.jpg` | Testimonial photo | 400×400px |
| `sophia-marchetti.jpg` | Testimonial photo | 400×400px |

## Adding photos to the site

**For team/testimonial avatars**, replace the gradient initials div with:
```html
<img src="assets/images/ava-reynolds.jpg" alt="Ava Reynolds" style="width:100%;height:100%;object-fit:cover;">
```

**For the logo**, replace the inline SVG in the `<nav>` and `<footer>` sections with:
```html
<img src="assets/images/BVH_Enterprises_logo_transparent_400w.png" alt="BVH Enterprises" style="height:40px;">
```
