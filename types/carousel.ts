export interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundVideo?: string
  backgroundColor?: string
  textColor?: string
  cta?: {
    text: string
    action: () => void
  }
}
