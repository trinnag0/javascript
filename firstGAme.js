var Snake = (function () {
    const INITIAL_TAIL = 4;
    var tileCount = 20;
    var gridSize = 400 / tileCount;

    var velocity = { x: 0, y: 0 };
    var player = { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) };
    var fruit = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    var trail = [];
    var tail = INITIAL_TAIL;

    var canv, ctx;

    function setup() {
        canv = document.getElementById('gc');
        ctx = canv.getContext('2d');
        document.addEventListener('keydown', keyPush);
        setInterval(gameLoop, 1000 / 15);
    }

    function keyPush(evt) {
        switch (evt.keyCode) {
            case 37: // Left
                if (velocity.x === 0) {
                    velocity = { x: -1, y: 0 };
                }
                break;
            case 38: // Up
                if (velocity.y === 0) {
                    velocity = { x: 0, y: -1 };
                }
                break;
            case 39: // Right
                if (velocity.x === 0) {
                    velocity = { x: 1, y: 0 };
                }
                break;
            case 40: // Down
                if (velocity.y === 0) {
                    velocity = { x: 0, y: 1 };
                }
                break;
        }
    }

    function gameLoop() {
        player.x += velocity.x;
        player.y += velocity.y;

        if (player.x < 0) player.x = tileCount - 1;
        if (player.x >= tileCount) player.x = 0;
        if (player.y < 0) player.y = tileCount - 1;
        if (player.y >= tileCount) player.y = 0;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canv.width, canv.height);

        ctx.fillStyle = 'lime';
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
            if (trail[i].x === player.x && trail[i].y === player.y) {
                tail = INITIAL_TAIL;
            }
        }

        trail.push({ x: player.x, y: player.y });
        while (trail.length > tail) {
            trail.shift();
        }

        if (player.x === fruit.x && player.y === fruit.y) {
            tail++;
            fruit = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize - 2, gridSize - 2);
    }

    setup();
})();