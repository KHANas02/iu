need to register the CSS properties to use them in keyframe animations.
['--contrast', '--saturate', '--brightness'].forEach((property) => {
  CSS.registerProperty({
    name: property, syntax: "<number>", initialValue: 0, inherits: "false"
  });
})

 CSS.registerProperty({
   name: '--blur', syntax: "<length>", initialValue: '0px', inherits: "false"
 });

CSS.registerProperty({
   name: '--hue', syntax: "<angle>", initialValue: '0deg', inherits: "false"
 });

// Also we need to default the scroll for several modes to the half way point.
document.querySelectorAll('.scroller:not([data-no-initial-scroll])').forEach((s) => s.scrollLeft = s.scrollWidth / 4);


// The above is enough for the demo to work on touch devices
// However, for non-touch devices let's map mouse drag to scroll

document.querySelectorAll('.scroller').forEach((slider) => {
  let mouseDown = false;
  let startX, scrollLeft;

  const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  const stopDragging = (e) => {
    mouseDown = false;
  }

  const move = (e) => {
    e.preventDefault();
    if(!mouseDown) { return; }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
  }
  
  slider.addEventListener('mousemove', move, false);
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mouseup', stopDragging, false);
  slider.addEventListener('mouseleave', stopDragging, false);
})