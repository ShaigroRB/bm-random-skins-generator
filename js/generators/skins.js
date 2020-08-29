area = document.getElementById("skin-json");
defaultSkin = {
    "base": "0",
    "base_color": "0",
    "pattern": "0",
    "pattern_color": "0",
    "pattern_two": "0",
    "pattern_two_color": "0",
    "effect": "0",
    "effect_color": "0",
    "glow_color_1": "-1",
    "glow_color_2": "-1",
    "default_weapon": "1",
    "author_name": "Random generator",
    "author_id": "42",
    "name": "Random",
    "description": "This is a skin generated randomly."
};

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function randomColor() {
    red = random(0, 255);
    green = random(0, 255) * 256;
    blue = random(0, 255) * 65536;
    return red + green + blue;
}

function randomGlow() {
    if (random(0, 100) < 70) {
        return -1;
    }
    return randomColor();
}

function toString(elm) {
    return "" + elm + "";
}

function generate_random_skin() {
    area.value = "";

    skin = defaultSkin;
    skin.effect = toString(random(0, 9));
    skin.glow_color_1 = toString(randomGlow());
    skin.pattern_two = toString(random(0, 14));
    skin.pattern_color = toString(randomColor());
    skin.pattern = toString(random(0, 14));
    skin.effect_color = toString(randomColor());
    skin.base = toString(random(0, 14));
    skin.glow_color_2 = toString(randomGlow());
    skin.base_color = toString(randomColor());
    skin.pattern_two_color = toString(randomColor());

    area.value = JSON.stringify(defaultSkin);
}

function copy() {
    area.select();
    area.setSelectionRange(0, 99999);
    document.execCommand("copy");
}