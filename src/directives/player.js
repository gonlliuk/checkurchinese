import YTPlayer from 'yt-player';

export default {
    inserted: (el, binding) => {
        const playerDOM = document.createElement('div');
        el.appendChild(playerDOM);

        const player = new YTPlayer(playerDOM, {
            autoplay: false,
        });

        player.load(binding.value.url);
        player.setVolume(100);
    },
};
