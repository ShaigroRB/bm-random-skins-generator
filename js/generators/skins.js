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

const randomizationSettings = {
    "base": true,
    "base_color": true,
    "pattern": true,
    "pattern_color": true,
    "pattern_two": true,
    "pattern_two_color": true,
    "effect": false,
    "effect_color": false,
    "glow_color_1": false,
    "glow_color_2": false,
};

// Skin generator
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

const copy = () => {
    area.select();
    area.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

const generate_random_skin = () => {
    area.value = "";

    let skin = { ...defaultSkin };
    skin.base = !randomizationSettings.base ? defaultSkin.base : toString(randomGivenMinAndMax(0, 14));
    skin.base_color = !randomizationSettings.base_color ? defaultSkin.base_color : toString(randomGMColor());
    skin.pattern = !randomizationSettings.pattern ? defaultSkin.pattern : toString(randomGivenMinAndMax(0, 14));
    skin.pattern_color = !randomizationSettings.pattern_color ? defaultSkin.pattern_color : toString(randomGMColor());
    skin.pattern_two = !randomizationSettings.pattern_two ? defaultSkin.pattern_two : toString(randomGivenMinAndMax(0, 14));
    skin.pattern_two_color = !randomizationSettings.pattern_two_color ? defaultSkin.pattern_two_color : toString(randomGMColor());
    skin.effect = !randomizationSettings.effect ? defaultSkin.effect : toString(randomGivenMinAndMax(0, 9));
    skin.effect_color = !randomizationSettings.effect_color ? defaultSkin.effect_color : toString(randomGMColor());
    skin.glow_color_1 = !randomizationSettings.glow_color_1 ? defaultSkin.glow_color_1 : toString(randomGlow());
    skin.glow_color_2 = !randomizationSettings.glow_color_2 ? defaultSkin.glow_color_2 : toString(randomGlow());

    area.value = JSON.stringify(skin);

    copy();
}

// Default settings handling
const getSelectValueGivenId = (id) => {
    return document.getElementById(id).value;
}

const setBaseDefault = () => {
    defaultSkin.base = getSelectValueGivenId("base-default");
}

const setPatternDefault = () => {
    defaultSkin.pattern = getSelectValueGivenId("pattern-default");
}

const setPattern2Default = () => {
    defaultSkin.pattern_two = getSelectValueGivenId("pattern2-default");
}

const setEffectDefault = () => {
    defaultSkin.effect = getSelectValueGivenId("effect-default");
}

// Randomization settings
const toggleIsBaseRandom = () => {
    randomizationSettings.base = !randomizationSettings.base;
}

const toggleIsBaseColorsRandom = () => {
    randomizationSettings.base_color = !randomizationSettings.base_color;
}

const toggleIsPattern1Random = () => {
    randomizationSettings.pattern = !randomizationSettings.pattern;
}

const toggleIsPattern1ColorsRandom = () => {
    randomizationSettings.pattern_color = !randomizationSettings.pattern_color;
}

const toggleIsPattern2Random = () => {
    randomizationSettings.pattern_two = !randomizationSettings.pattern_two;
}

const toggleIsPattern2ColorsRandom = () => {
    randomizationSettings.pattern_two_color = !randomizationSettings.pattern_two_color;
}

const toggleIsEffectRandom = () => {
    randomizationSettings.effect = !randomizationSettings.effect;
}

const toggleIsEffectColorsRandom = () => {
    randomizationSettings.effect_color = !randomizationSettings.effect_color;
}

const toggleIsGlowColor1Random = () => {
    randomizationSettings.glow_color_1 = !randomizationSettings.glow_color_1;
}

const toggleIsGlowColor2Random = () => {
    randomizationSettings.glow_color_2 = !randomizationSettings.glow_color_2;
}