const skinsName = [
    "burst_rifle"
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

const generateWeaponBaseForSvg = (weapon) => {
    return '<image width="100%" height="100%"'
        + 'xlink:href="imgs/skins/' + weapon + '/' + weapon + '_base.png" />';
};

const generateWeaponPatternWithFilterForSvg = (
    weapon,
    pattern, filter_name
) => {
    return '<image width="100%" height="100%"'
        + 'xlink:href="imgs/skins/' + weapon + '/' + weapon + '_' + pattern + '.png"'
        + 'filter="url(#' + filter_name + ')" />';
};

const defs = document.getElementById("objs_definition_svg");
const imgsGroup = document.getElementById("group_imgs_svg");

const generatePatternAndItsFilterForSvg = (
    weapon,
    pattern_name, pattern, color
) => {
    if (pattern > 0) {
        const filterSvg = generateFilterForSvg(pattern_name, color);
        const patternSvg = generateWeaponPatternWithFilterForSvg(weapon, pattern, filterSvg.filter_name);

        defs.innerHTML += filterSvg.filter_svg;
        imgsGroup.innerHTML += patternSvg;
    }
};

const generateSvgForSkin = (
    base, base_color,
    pattern1, pattern1_color,
    pattern2, pattern2_color,
    weapon = "burst_rifle"
) => {
    //clear the svg
    defs.innerHTML = "";
    imgsGroup.innerHTML = "";

    const weaponBase = generateWeaponBaseForSvg(weapon);

    imgsGroup.innerHTML += weaponBase;

    generatePatternAndItsFilterForSvg(weapon, "base", base, base_color);
    generatePatternAndItsFilterForSvg(weapon, "pattern1", pattern1, pattern1_color);
    generatePatternAndItsFilterForSvg(weapon, "pattern2", pattern2, pattern2_color);
};