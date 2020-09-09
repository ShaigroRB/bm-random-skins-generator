const weapons = [
    new Weapon("burst_rifle", [new WeaponPart("burst_rifle_reload", [11, 12])])
];

const generateFilterForSvg = (name, color) => {
    const filter_name = 'mask_' + name;
    return {
        "filter_name": filter_name,
        "filter_svg":
            '<filter id="' + filter_name + '">'
            + '<feFlood flood-color="' + color + '" result="flood" />'
            + '<feComposite in="SourceGraphic" in2="flood" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />'
            + '</filter>'
    };
};

const generateWeaponPartBaseForSvg = (weapon, part) => {
    return '<image width="100%" height="100%"'
        + 'xlink:href="imgs/skins/' + weapon + '/' + part + '_base.png" />';
};

const generateWeaponPartPatternWithFilterForSvg = (
    weapon, part,
    pattern, filter_name
) => {
    return '<image width="100%" height="100%"'
        + 'xlink:href="imgs/skins/' + weapon + '/' + part + '_' + pattern + '.png"'
        + 'filter="url(#' + filter_name + ')" />';
};

const defs = document.getElementById("objs_definition_svg");
const imgsGroup = document.getElementById("group_imgs_svg");

/**
 * 
 * @param {Weapon} weapon 
 * @param {string} pattern_name 
 * @param {number} pattern 
 * @param {string} color 
 */
const generatePatternAndItsFilterForSvg = (
    weapon,
    pattern_name, pattern, color
) => {
    if (pattern > 0) {
        const filterSvg = generateFilterForSvg(pattern_name, color);
        const patternSvg = weapon.generatePatternAsSvgWithFilter(pattern, filterSvg.filter_name);

        defs.innerHTML += filterSvg.filter_svg;
        imgsGroup.innerHTML += patternSvg;
    }
};

/**
 * 
 * @param {number} base index of the base
 * @param {string} base_color hex color
 * @param {number} pattern1 index of the first pattern
 * @param {string} pattern1_color hex color
 * @param {number} pattern2 index of the second pattern
 * @param {string} pattern2_color hex color
 */
const generateSvgForSkin = (
    base, base_color,
    pattern1, pattern1_color,
    pattern2, pattern2_color
) => {
    //clear the svg
    defs.innerHTML = "";
    imgsGroup.innerHTML = "";

    const weapon = weapons[0];
    const weaponBase = weapon.generateBaseAsSvg();

    imgsGroup.innerHTML += weaponBase;

    generatePatternAndItsFilterForSvg(weapon, "base", base, base_color);
    generatePatternAndItsFilterForSvg(weapon, "pattern1", pattern1, pattern1_color);
    generatePatternAndItsFilterForSvg(weapon, "pattern2", pattern2, pattern2_color);
};