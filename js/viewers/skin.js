const weapons = [
    new Weapon("burst_rifle", [
        new WeaponPart("burst_rifle", []),
        new WeaponPart("burst_rifle_reload", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14])
    ]),
    new Weapon("acid_gun", [
        new WeaponPart("acid_gun", [10]),
        new WeaponPart("acid_gun_handle", [3, 5])
    ]),
    new Weapon("handcannon", [
        new WeaponPart("handcannon", [8]),
        new WeaponPart("handcannon_top", [5, 6, 10])
    ]),
    new Weapon("pistol", [
        new WeaponPart("pistol", [8]),
        new WeaponPart("pistol_top", [2, 4, 5, 6, 10])
    ]),
    new Weapon("compact_pistol", [
        new WeaponPart("compact_pistol", [3, 8]),
        new WeaponPart("compact_pistol_top", [2, 4, 6, 10])
    ]),
    new Weapon("burst_pistol", [
        new WeaponPart("burst_pistol", [3, 8]),
        new WeaponPart("burst_pistol_end", [2, 6, 10]),
        new WeaponPart("burst_pistol_reload", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14])
    ]),
    new Weapon("healgun", [
        new WeaponPart("healgun", []),
        new WeaponPart("healgun_cross", null)
    ]),
    new Weapon("double_barrel", [
        new WeaponPart("double_barrel", [3]),
        new WeaponPart("double_barrel_handle", [8])
    ]),
    new Weapon("grenade_launcher", [
        new WeaponPart("grenade_launcher", [3, 8]),
        new WeaponPart("grenade_launcher_handle", [2, 6, 10])
    ]),
    new Weapon("boomerang", [
        new WeaponPart("boomerang", [])
    ]),
    new Weapon("crossbow", [
        new WeaponPart("crossbow", [])
    ]),
    new Weapon("fire_uzi", [
        new WeaponPart("fire_uzi", [])
    ]),
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