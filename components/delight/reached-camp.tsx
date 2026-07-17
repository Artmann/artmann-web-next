import type { ReactElement } from 'react'

import Campfire from './campfire'
import ParticleField from './particle-field'

export default function ReachedCamp(): ReactElement {
  return (
    <div className="relative flex flex-col items-center gap-3 pb-6 pt-4 text-center">
      <ParticleField
        className="absolute inset-0 h-full w-full"
        count={3}
        mode="fireflies"
      />

      <Campfire
        size={44}
        variant="inline"
      />

      <p className="m-0 text-sm text-gray-500">
        You&apos;ve reached camp. Thanks for reading.
      </p>
    </div>
  )
}
