import React, { useState, useEffect } from "react"
import { useMediaQuery } from "@material-ui/core"
import { bps } from "@/ui/theme"
import PropTypes from "prop-types"

const InfiniteScroll = ({ list, onItem, step }) => {
  const { mobile = 5, desktop = 20 } = step
  const isMobile = useMediaQuery(bps.down("md"))
  const [itemSize, setItemSize] = useState(mobile)
  const [loadMore, setLoadMore] = useState(false)
  useEffect(() => {
    if (!loadMore) return
    setItemSize(itemSize + (isMobile ? mobile : desktop))
    setLoadMore(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore, itemSize, isMobile])

  const onScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return
    setLoadMore(true)
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {list &&
        list.filter((_, i) => i < itemSize).map((item, i) => onItem(item, i))}
    </>
  )
}

InfiniteScroll.propTypes = {
  onItem: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
}

export default InfiniteScroll
