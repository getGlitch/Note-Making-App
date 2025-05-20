variable "region" {
  default = "eu-north-1"
}

variable "project_name" {
  default = "note-making-proj"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "ubuntu_ami" {
  default = "ami-0c1ac8a41498c1a9c" # Ubuntu 20.04 for eu-north-1 (check before deploy)
}

variable "availability_zones" {
  default = ["eu-north-1a", "eu-north-1b"]
}
variable "ssh_key_name" {
  type        = string
}
variable "my_ip_cidr" {
  default     = "0.0.0.0/0"
}
