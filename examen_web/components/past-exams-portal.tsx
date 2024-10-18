'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Upload, Download, X } from "lucide-react"

export function PastExamsPortal() {
  const [searchResults, setSearchResults] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)

  const handleUpload = (e) => {
    e.preventDefault()
    // Here you would implement the actual upload logic
    alert("Exam uploaded successfully!")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Here you would implement the actual search logic
    // This is just mock data for demonstration
    setSearchResults([
      { id: 1, courseName: "Introduction to Computer Science", courseCode: "CS101", year: 2023, season: "Spring", professor: "Dr. Smith", pdfUrl: "/placeholder.pdf" },
      { id: 2, courseName: "Data Structures", courseCode: "CS201", year: 2022, season: "Fall", professor: "Dr. Johnson", pdfUrl: "/placeholder.pdf" },
    ])
  }

  const handleDownload = (pdfUrl) => {
    // In a real application, you would implement the actual download logic here
    // For demonstration purposes, we'll just open the PDF in a new tab
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Past Exams Portal</h1>
      <Tabs defaultValue="search" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search Exams</TabsTrigger>
          <TabsTrigger value="upload">Upload Exam</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Past Exams</CardTitle>
              <CardDescription>Enter a course name or code to find past exams</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex space-x-2">
                  <Input placeholder="Enter course name or code" />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>
              {searchResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
                  <ul className="space-y-2">
                    {searchResults.map((result) => (
                      <li key={result.id} className="bg-muted p-3 rounded-md">
                        <p className="font-medium">{result.courseName}</p>
                        <p className="text-sm text-muted-foreground">{result.courseCode}</p>
                        <p className="text-sm text-muted-foreground">{result.season} {result.year} - {result.professor}</p>
                        <div className="flex space-x-2 mt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">View Exam</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl w-full h-[80vh]">
                              <DialogHeader>
                                <DialogTitle>{result.courseName} - {result.courseCode}</DialogTitle>
                              </DialogHeader>
                              <iframe src={result.pdfUrl} className="w-full h-full" />
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" onClick={() => handleDownload(result.pdfUrl)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Exam</CardTitle>
              <CardDescription>Add a new past exam to the database</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input id="courseName" placeholder="e.g. Introduction to Computer Science" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code</Label>
                  <Input id="courseCode" placeholder="e.g. CS101" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" type="number" placeholder="e.g. 2023" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Select required>
                    <SelectTrigger id="season">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="professor">Professor</Label>
                  <Input id="professor" placeholder="e.g. Dr. Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examFile">Exam File (PDF)</Label>
                  <Input id="examFile" type="file" accept=".pdf" required />
                </div>
                <Button type="submit" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Exam
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}