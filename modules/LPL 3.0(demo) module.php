<?php
//your files in $fileNames
$fileNames = [
    "lpl 3.0 module/file1.lpl"
];
# documentation => https://lplanguage.github.io/lplang.github.io/doc.html

foreach ($fileNames as $fileName) {
    $lplCode = openAndReadLPLFile($fileName);
    
    if ($lplCode !== false) {
        executeLPLCode($fileName, $lplCode);
    }
}

function openAndReadLPLFile($fileName) {
    $lplCode = file_get_contents($fileName);

    if ($lplCode !== false) {
        return $lplCode;
    } else {
        echo "Не удалось прочитать файл $fileName.<br>";
        return false;
    }
}

function executeLPLCode($fileName, $lplCode) {
    $lplBlocks = preg_split('/<lpl>(.*?)<\/lpl>/s', $lplCode, -1, PREG_SPLIT_DELIM_CAPTURE);

    foreach ($lplBlocks as $index => $block) {
        if ($index % 2 === 1) {
            $block = preg_replace('/\/\/.*$/m', '', $block);
            $block = preg_replace('/\/\*.*?\*\//s', '', $block);
            $block = str_replace('print', 'echo', $block);
            $block = str_replace('const(', 'define(', $block);
            $block = str_replace('err(', 'error_log(', $block);
            $block = str_replace('func ', 'function ', $block);
            $block = str_replace('intrf ', 'interface ', $block);
            $block = str_replace('impl ', 'implements ', $block);
            $block = str_replace('abst ', 'abstract ', $block);

            $block = preg_replace_callback('/random\((\d+), (\d+)\);/', function ($matches) {
                $min = $matches[1];
                $max = $matches[2];
                $randomNumber = mt_rand($min, $max);
                return '$randomNumber = ' . $randomNumber . ';';
            }, $block);

            $block = str_replace('translate();', '<?php ' . $block . ' ?>', $block);

            $fileNameWithoutExtension = pathinfo($fileName, PATHINFO_FILENAME);
            $phpFileName = "69133742025" . $fileNameWithoutExtension . '.php';

            file_put_contents($phpFileName, '<?php ' . $block . ' ?>');

            include $phpFileName;

            unlink($phpFileName);
        } else {
            echo $block;
        }
    }
}
?>