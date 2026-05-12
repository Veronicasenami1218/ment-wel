import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import type { AssessmentResult } from '../services/assessment.service'

export const generateAssessmentPDF = async (
  result: AssessmentResult,
  elementId: string = 'assessment-results-content'
): Promise<void> => {
  try {
    // Get the element to convert to PDF
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Assessment results element not found')
    }

        
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    })

    // Get image data
    const imgData = canvas.toDataURL('image/png')
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate image dimensions to fit the page
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 200
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 15

    // Add the image to PDF
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)

    // Add footer with timestamp
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    pdf.setFontSize(8)
    pdf.setTextColor(100)
    pdf.text(`Generated on ${date}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' })
    pdf.text('MentWel Mental Health Platform - Confidential Assessment Results', pdfWidth / 2, pdfHeight - 5, { align: 'center' })

    // Add disclaimer on new page if needed
    pdf.addPage()
    pdf.setFontSize(10)
    pdf.setTextColor(50)
    pdf.setFont(undefined, 'bold')
    pdf.text('Disclaimer', 20, 20)
    pdf.setFont(undefined, 'normal')
    pdf.setFontSize(9)
    
    const disclaimer = [
      'This assessment is a screening tool, not a clinical diagnosis.',
      'Results are for personal reflection and educational purposes only.',
      'Please consult a qualified mental health professional for a proper evaluation.',
      '',
      'If you are experiencing severe distress or having thoughts of self-harm,',
      'please contact emergency services immediately or reach out to a mental health crisis line.',
      '',
      'Nigeria Emergency: 112',
      'Suicide Prevention Hotline: 0800-800-2000'
    ]
    
    let yPosition = 30
    disclaimer.forEach(line => {
      if (line === '') {
        yPosition += 5
      } else {
        const lines = pdf.splitTextToSize(line, pdfWidth - 40)
        lines.forEach((textLine: string) => {
          pdf.text(textLine, 20, yPosition)
          yPosition += 5
        })
      }
    })

    // Save the PDF
    const fileName = `mentwel-assessment-${result.assessmentTitle.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(fileName)
    
    return Promise.resolve()
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}

// Alternative simple PDF generation without html2canvas (fallback)
export const generateSimpleAssessmentPDF = async (result: AssessmentResult): Promise<void> => {
  try {
    const pdf = new jsPDF()
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // Title
    pdf.setFontSize(20)
    pdf.setTextColor(41, 98, 255) // Blue color
    pdf.text('MentWel Assessment Results', pdfWidth / 2, 30, { align: 'center' })
    
    // Assessment Title
    pdf.setFontSize(16)
    pdf.setTextColor(50)
    pdf.text(result.assessmentTitle, pdfWidth / 2, 45, { align: 'center' })
    
    // Date
    pdf.setFontSize(10)
    pdf.setTextColor(100)
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    pdf.text(`Assessment Date: ${date}`, 20, 60)
    
    // Score Section
    pdf.setFontSize(14)
    pdf.setTextColor(50)
    pdf.text('Your Score', 20, 80)
    
    pdf.setFontSize(24)
    pdf.setTextColor(41, 98, 255)
    pdf.text(`${result.score} / ${result.maxScore}`, 20, 95)
    
    // Severity Level
    const severityConfig = {
      minimal: { label: 'Minimal', color: [34, 197, 94] },
      mild: { label: 'Mild', color: [250, 204, 21] },
      moderate: { label: 'Moderate', color: [251, 146, 60] },
      severe: { label: 'Severe', color: [239, 68, 68] }
    }
    
    const severity = severityConfig[result.severity as keyof typeof severityConfig]
    pdf.setTextColor(...(severity.color as [number, number, number]))
    pdf.setFontSize(16)
    pdf.text(`${severity.label} Severity`, 20, 115)
    
    // Interpretation
    pdf.setTextColor(50)
    pdf.setFontSize(12)
    pdf.text('Interpretation', 20, 140)
    
    pdf.setFontSize(10)
    const interpretationLines = pdf.splitTextToSize(result.interpretation, pdfWidth - 40)
    let yPosition = 150
    interpretationLines.forEach((line: string) => {
      pdf.text(line, 20, yPosition)
      yPosition += 5
    })
    
    // Recommendations
    yPosition += 10
    pdf.setFontSize(12)
    pdf.text('Recommendations', 20, yPosition)
    yPosition += 10
    
    pdf.setFontSize(10)
    result.recommendations.forEach((rec, index) => {
      const recLines = pdf.splitTextToSize(`${index + 1}. ${rec}`, pdfWidth - 40)
      recLines.forEach((line: string) => {
        if (yPosition > pdfHeight - 30) {
          pdf.addPage()
          yPosition = 20
        }
        pdf.text(line, 20, yPosition)
        yPosition += 5
      })
      yPosition += 3
    })
    
    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(100)
    pdf.text(`Generated on ${new Date().toLocaleDateString()} - MentWel Mental Health Platform`, pdfWidth / 2, pdfHeight - 10, { align: 'center' })
    
    // Save the PDF
    const fileName = `mentwel-assessment-${result.assessmentTitle.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(fileName)
    
    return Promise.resolve()
  } catch (error) {
    console.error('Error generating simple PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}
