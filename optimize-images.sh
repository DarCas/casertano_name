#!/bin/bash

#
# Dario Casertano <dario@casertano.name>
# Copyright (c) 2026 Casertano Dario – All rights reserved.
# Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
#

# optimize-images.sh
#
# Converts PNG/JPEG source images to compressed WebP at display-ready resolution.
# Designed for the casertano.name portfolio Docker container.
#
# What it does:
#   1. Scans @storage/images/projects/ for *.png, *.jpg, *.jpeg files.
#   2. Converts each to WebP using Google's cwebp encoder:
#        - quality 75 (aggressive but visually acceptable)
#        - resize to 720px width (project modal max-width)
#        - maximum compression (-m 6 -pass 10) with multi-threading (-mt)
#   3. Moves original source files to backup/ on success.
#
# Usage:
#   docker exec name_casertano bash /app/optimize-images.sh
#
# cwebp flags:
#   -q 75           Encoding quality (0=worst, 100=best). 75 is the PageSpeed-
#                   recommended sweet spot for photo content.
#   -m 6            Compression method (0=fast, 6=slowest/smallest).
#   -pass 10        Number of analysis passes (more = better).
#   -mt             Multi-threaded encoding.
#   -resize 720 0   Resize to 720px wide, height auto. 720px matches the
#                   project modal max-width in the frontend.
#
# Requirements (pre-installed in Docker image):
#   bash, libwebp-tools (cwebp), file

set -euo pipefail

cd "$(dirname "$0")" || exit
clear

cd ./@storage/images/projects || { echo "Directory not found"; exit 1; }

shopt -s nullglob
files=( *.png *.jpg *.jpeg )

if [ ${#files[@]} -eq 0 ]; then
  echo "No PNG/JPEG files found."
  exit 0
fi

mkdir -p backup

for f in "${files[@]}"; do
  echo "Converting $f ..."
  output="${f%.*}.webp"

  cwebp -q 75 -m 6 -pass 10 -mt -resize 720 0 "$f" -o "$output"

  mv "$f" backup/
  echo "  -> $output (original moved to backup/)"
done

echo "Done. ${#files[@]} files converted."
