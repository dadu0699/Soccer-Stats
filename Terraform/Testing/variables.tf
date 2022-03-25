variable "google_access" {
    type        = string
    description = "Path to the Google Cloud credentials file"
}

variable "gcr_id" {
    type        = string
    description = "GCR ID"
}

variable "testing_ip" {
    type        = string
    description = "IP address for the testing VM"
}

variable "frontend_image" {
    type        = string
    description = "Frontend image"
}
