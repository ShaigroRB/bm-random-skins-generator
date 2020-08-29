const area = document.getElementById("skin-json");
const defaultSkin = {
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

const randomGivenMinAndMax = (min, max) => {
    return Math.floor((Math.random() * max) + min);
}

const randomGMColor = () => {
    const red = randomGivenMinAndMax(0, 255);
    const green = randomGivenMinAndMax(0, 255) * 256;
    const blue = randomGivenMinAndMax(0, 255) * 65536;
    return red + green + blue;
}

const randomGlow = () => {
    if (randomGivenMinAndMax(0, 100) < 70) {
        return -1;
    }
    return randomGMColor();
}

const toString = (elm) => {
    return "" + elm + "";
}

const generate_random_skin = () => {
    area.value = "";

    let skin = { ...defaultSkin };
    skin.base = toString(randomGivenMinAndMax(0, 14));
    skin.base_color = toString(randomGMColor());
    skin.pattern = toString(randomGivenMinAndMax(0, 14));
    skin.pattern_color = toString(randomGMColor());
    skin.pattern_two = toString(randomGivenMinAndMax(0, 14));
    skin.pattern_two_color = toString(randomGMColor());
    skin.effect = toString(randomGivenMinAndMax(0, 9));
    skin.effect_color = toString(randomGMColor());
    skin.glow_color_1 = toString(randomGlow());
    skin.glow_color_2 = toString(randomGlow());

    area.value = JSON.stringify(skin);
}

const copy = () => {
    area.select();
    area.setSelectionRange(0, 99999);
    document.execCommand("copy");
}