const weapons = [
];

const skinViewer = document.getElementById("skin-viewer");

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
    const weaponPatterns = [
        new WeaponPattern("base", base, base_color),
        new WeaponPattern("pattern1", pattern1, pattern1_color),
        new WeaponPattern("pattern2", pattern2, pattern2_color)
    ];

    const weapon = weapons[randomGivenMinAndMax(0, weapons.length)];
    skinViewer.innerHTML = weapon.generateSvgGivenPatterns(250, 144, weaponPatterns);
};