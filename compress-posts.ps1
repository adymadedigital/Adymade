$inputFolder = "static\gallery\posts"
$outputFolder = "static\gallery\posts-compressed"

# Compress videos in posts folder
Get-ChildItem -Path $inputFolder -Filter *.mp4 | ForEach-Object {
    $inputFile = $_.FullName
    $outputFile = Join-Path $outputFolder $_.Name

    Write-Host "Compressing video: $($_.Name)"

    ffmpeg -i "$inputFile" `
        -vcodec libx264 -crf 30 -preset slower `
        -vf "scale='min(1280,iw)':-2" `
        -acodec aac -b:a 96k `
        -movflags +faststart `
        -y "$outputFile"
}

# Copy images as-is (jpg, jpeg, png, jpeg) - no need to compress these
Get-ChildItem -Path $inputFolder -Include *.jpg,*.jpeg,*.png -Recurse | ForEach-Object {
    Copy-Item $_.FullName -Destination (Join-Path $outputFolder $_.Name)
    Write-Host "Copied image: $($_.Name)"
}

Write-Host "All posts compressed/copied!"