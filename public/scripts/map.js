const map = document.querySelector(".map")

navigator.geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords
    map.innerHTML = '<iframe width="700" height="300" src="https://maps.google.com/maps?q='+latitude+', '+longitude+'&amp;z=15&amp;output=embed"></iframe>'
})