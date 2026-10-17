Add-Type -AssemblyName System.IO.Compression.FileSystem

function Read-DocxText($filePath) {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($filePath)
    $entry = $zip.GetEntry('word/document.xml')
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xmlContent = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()
    
    $xml = [xml]$xmlContent
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    
    $nodes = $xml.SelectNodes('//w:p', $ns)
    $lines = @()
    foreach ($node in $nodes) {
        $tNodes = $node.SelectNodes('.//w:t', $ns)
        $tList = @()
        foreach ($t in $tNodes) {
            $tList += $t.InnerText
        }
        $line = ($tList -join '').Trim()
        if ($line.Length -gt 0) {
            $lines += $line
        }
    }
    return $lines
}

Write-Host "=== 1. Major Types of Ads - zunme.docx ==="
$ads = Read-DocxText "d:\Kiaan\Zunme-AI-\document\Major Types of Ads - zunme.docx"
$ads | Out-File -FilePath "d:\Kiaan\Zunme-AI-\document_ads_extracted.txt" -Encoding utf8
Write-Host "Extracted $($ads.Count) lines to document_ads_extracted.txt"

Write-Host "`n=== 2. Home - zunme - website entry point.docx ==="
$homeDoc = Read-DocxText "d:\Kiaan\Zunme-AI-\document\Home - zunme - website entry point.docx"
$homeDoc | Out-File -FilePath "d:\Kiaan\Zunme-AI-\document_home_extracted.txt" -Encoding utf8
Write-Host "Extracted $($homeDoc.Count) lines to document_home_extracted.txt"
