import { Hero } from '@/components/home/hero'
import { Services } from '@/components/home/services'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
    </div>
  )
}
