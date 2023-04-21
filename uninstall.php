<?php

declare(strict_types=1);

$addon = rex_addon::get('demo_fullpage');

// update config
// remove additional config from base config
$config = array_diff_recursive(
    rex_file::getConfig($addon->getPath('package.yml')),
    rex_file::getConfig($addon->getPath('package.setup.yml')),
);

rex_file::putConfig($addon->getPath('package.yml'), $config);

// Computes the difference of two arrays recursively
// https://gist.github.com/t3chnik/6b3b14d3859d810c02f4

/**
 * Array Recursive Diff.
 * @param  array<mixed> $aArray1
 * @param  array<mixed> $aArray2
 * @return array<mixed>
 */
function array_diff_recursive($aArray1, $aArray2): array
{
    $aReturn = [];
    foreach ($aArray1 as $mKey => $mValue) {
        if (array_key_exists($mKey, $aArray2)) {
            if (is_array($mValue)) {
                if (is_array($aArray2[$mKey])) {
                    $aRecursiveDiff = array_diff_recursive($mValue, $aArray2[$mKey]);
                    if ([] !== $aRecursiveDiff) {
                        $aReturn[$mKey] = $aRecursiveDiff;
                    }
                }
            } elseif ($mValue !== $aArray2[$mKey]) {
                $aReturn[$mKey] = $mValue;
            }
        } else {
            $aReturn[$mKey] = $mValue;
        }
    }

    return $aReturn;
}
