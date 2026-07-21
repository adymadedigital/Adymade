$inputFolder = "static\gallery\videos"
$outputFolder = "static\gallery\videos-compressed"

Get-ChildItem -Path $inputFolder -Filter *.mp4 | ForEach-Object {
    $inputFile = $_.FullName
    $outputFile = Join-Path $outputFolder $_.Name

    Write-Host "Compressing: $($_.Name)"

    ffmpeg -i "$inputFile" `
        -vcodec libx264 -crf 30 -preset slower `
        -vf "scale='min(1280,iw)':-2" `
        -acodec aac -b:a 96k `
        -movflags +faststart `
        -y "$outputFile"
}

Write-Host "All videos compressed!"