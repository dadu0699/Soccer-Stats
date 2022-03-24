terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
    }
  }
}

provider "google" {
  version = "3.5.0"

  project = "sa-1s2022"
  region  = "us-central1"
  zone    = "us-central1-c"
}

data "template_file" "init" {
  template = file("./Scripts/startup_script.sh")

  vars = {
    google_credentials_file = var-file.google_credentials_file
    gcr_id = var.gcr_id
  }
}

resource "google_compute_instance" "vm_testing" {
  name          = "testing-server"
  machine_type  = "e2-medium"

  tags = ["allin", "allout"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
    }
  }

  network_interface {
    network = "default"

    access_config {
      nat_ip = var.testing_ip
    }
  }

   metadata_startup_script = data.template_file.init.rendered
}
