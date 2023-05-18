import router from '@/router'
import { useNProgress } from '@/hooks/web/useNProgress'
import { useTitle } from '@/hooks/web/useTitle'

const { start, done } = useNProgress()

router.beforeEach(async (to, from, next) => {
  start()

  next()
})

router.afterEach(to => {
  console.log(router.getRoutes())
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
})
