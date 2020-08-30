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
const hexColorToGMColor = (hexColor) => {
    const hexColorToRGBColor = (hexColor) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const rgbColors = hexColorToRGBColor(hexColor);
    let result;
    if (rgbColors != null) {
        result = rgbColors.r + (rgbColors.g * 256) + (rgbColors.b * 65536)
    } else {
        result = 0;
    }
    return result;
}

const randomGivenMinAndMax = (min, max) => {
    return Math.floor((Math.random() * max) + min);
}

const randomHexColor = () => {
    const hexColor = randomGivenMinAndMax(0, 16777215).toString(16);
    return "#" + hexColor;
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

const copy = () => {
    area.select();
    area.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

const generateRandomSkin = () => {
    area.value = "";

    // const values to use them in the json and in the viewer
    const base = !randomizationSettings.base ? defaultSkin.base : randomGivenMinAndMax(0, 14).toString();
    const base_color = !randomizationSettings.base_color ? defaultSkin.base_color : randomHexColor();
    const pattern = !randomizationSettings.pattern ? defaultSkin.pattern : randomGivenMinAndMax(0, 14).toString();
    const pattern_color = !randomizationSettings.pattern_color ? defaultSkin.pattern_color : randomHexColor();
    const pattern_two = !randomizationSettings.pattern_two ? defaultSkin.pattern_two : randomGivenMinAndMax(0, 14).toString();
    const pattern_two_color = !randomizationSettings.pattern_two_color ? defaultSkin.pattern_two_color : randomHexColor();
    const effect = !randomizationSettings.effect ? defaultSkin.effect : randomGivenMinAndMax(0, 9).toString();
    const effect_color = !randomizationSettings.effect_color ? defaultSkin.effect_color : randomHexColor();
    const glow_color_1 = !randomizationSettings.glow_color_1 ? defaultSkin.glow_color_1 : randomGlow().toString();
    const glow_color_2 = !randomizationSettings.glow_color_2 ? defaultSkin.glow_color_2 : randomGlow().toString();

    // json in text area. Always copy at the end of generation.
    let skin = { ...defaultSkin };
    skin.base = base;
    skin.base_color = hexColorToGMColor(base_color).toString();
    skin.pattern = pattern;
    skin.pattern_color = hexColorToGMColor(pattern_color).toString();
    skin.pattern_two = pattern_two;
    skin.pattern_two_color = hexColorToGMColor(pattern_two_color).toString();
    skin.effect = effect;
    skin.effect_color = hexColorToGMColor(effect_color).toString();
    skin.glow_color_1 = glow_color_1;
    skin.glow_color_2 = glow_color_2;

    area.value = JSON.stringify(skin);
    copy();

    // generate the skin for the skin viewer
    generateSvgForSkin(base, base_color, pattern, pattern_color, pattern_two, pattern_two_color);
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

const setBaseColorDefault = () => {
    defaultSkin.base_color = getSelectValueGivenId("base-color-default");
}

const setPatternColorDefault = () => {
    defaultSkin.pattern_color = getSelectValueGivenId("pattern-color-default");
}

const setPattern2ColorDefault = () => {
    defaultSkin.pattern_two_color = getSelectValueGivenId("pattern2-color-default");
}

const setEffectColorDefault = () => {
    defaultSkin.effect_color = getSelectValueGivenId("effect-color-default");
}

let isGlowColor1Enabled = false;
const glow1Color = document.getElementById("glow1-color-default");
let isGlowColor2Enabled = false;
const glow2Color = document.getElementById("glow2-color-default");

const toggleIsGlowColor1Enabled = () => {
    isGlowColor1Enabled = !isGlowColor1Enabled;
    if (!isGlowColor1Enabled) {
        defaultSkin.glow_color_1 = "0";
        glow1Color.style.display = "none";
    } else {
        glow1Color.style.display = "initial";
    }
}

const setGlowColor1Default = () => {
    defaultSkin.glow_color_1 = hexColorToGMColor(glow1Color.value).toString();
}

const toggleIsGlowColor2Enabled = () => {
    isGlowColor2Enabled = !isGlowColor2Enabled;
    if (!isGlowColor2Enabled) {
        defaultSkin.glow_color_2 = "0";
        glow2Color.style.display = "none";
    } else {
        glow2Color.style.display = "initial";
    }
}

const setGlowColor2Default = () => {
    defaultSkin.glow_color_2 = hexColorToGMColor(glow2Color.value).toString();
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