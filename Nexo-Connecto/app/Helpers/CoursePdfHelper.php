<?php

namespace App\Helpers;

use Smalot\PdfParser\Parser;

class CoursePdfHelper
{
    /**
     * Extract content from PDF, optionally from specific pages
     * 
     * @param string $pdfPath Relative path from public folder
     * @param array|null $pages Optional array of page numbers (1-based). If null, extracts all pages.
     *                          Examples: [1, 2, 3] for pages 1, 2, 3
     *                                    [1, 2] for pages 1 and 2
     *                                    null for all pages
     * @return string Extracted text content
     */
    public static function extractPdfContent($pdfPath, $pages = null)
    {
        $fullPath = public_path($pdfPath);
        
        if (!file_exists($fullPath)) {
            throw new \Exception("PDF file not found: {$fullPath}");
        }
        
        try {
            $parser = new Parser();
            $pdf = $parser->parseFile($fullPath);
            
            // If no specific pages requested, extract all
            if ($pages === null) {
                $text = $pdf->getText();
                return $text;
            }
            
            // Extract from specific pages
            $allPages = $pdf->getPages();
            $extractedText = [];
            
            foreach ($pages as $pageNumber) {
                // Convert 1-based page number to 0-based index
                $pageIndex = $pageNumber - 1;
                
                if (isset($allPages[$pageIndex])) {
                    $page = $allPages[$pageIndex];
                    $pageText = $page->getText();
                    $extractedText[] = "--- Page {$pageNumber} ---\n{$pageText}";
                } else {
                    throw new \Exception("Page {$pageNumber} does not exist in the PDF. Total pages: " . count($allPages));
                }
            }
            
            return implode("\n\n", $extractedText);
            
        } catch (\Exception $e) {
            throw new \Exception("Error extracting PDF content: " . $e->getMessage());
        }
    }

    /**
     * Get the PDF data array
     * 
     * Each item can optionally include a 'pages' key with an array of page numbers to extract.
     * If 'pages' is not specified, all pages will be extracted.
     * 
     * @return array
     */
    public static function getPdfData()
    {
        return [
            [
                'major_id' => 21,
                'pdf_path' => 'UniversityPDFs/INXHINIERI-AMBIENTIT-PDF.pdf',
                'pages' => [28,29]
            ],
            // [
            //     'major_id' => 7,
            //     'pdf_path' => 'UniversityPDFs/SHKENCA-KOMPJUTERIKE-PDF.pdf',
            //     'pages' => [1, 2] // Optional: extract only pages 1 and 2
            // ]
        ];
    }
}