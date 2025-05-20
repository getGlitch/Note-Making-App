output "alb_dns" {
  description = "ALB DNS name"
  value       = aws_lb.app_lb.dns_name
}
