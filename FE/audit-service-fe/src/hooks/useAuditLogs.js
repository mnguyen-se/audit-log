import { useState, useEffect, useCallback, useRef } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export function useAuditLogs() {
  const [logs, setLogs] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const searchTimer = useRef(null)

  const fetchLogs = useCallback((pageArg, searchArg) => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams({ page: pageArg, size: 20, search: searchArg || '' })

    fetch(`${API_BASE}/api/audit-logs?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setLogs(data.content || [])
        setTotalPages(data.totalPages || 0)
        setLastUpdated(new Date())
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Tai lai khi doi trang
  useEffect(() => {
    fetchLogs(page, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // Debounce khi go tim kiem
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setPage(0)
      fetchLogs(0, search)
    }, 400)
    return () => clearTimeout(searchTimer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  // Tu dong lam moi
  useEffect(() => {
    if (!autoRefresh) return
    const id = setInterval(() => fetchLogs(page, search), 5000)
    return () => clearInterval(id)
  }, [autoRefresh, page, search, fetchLogs])

  return {
    logs,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    autoRefresh,
    setAutoRefresh,
    loading,
    error,
    lastUpdated,
    refresh: () => fetchLogs(page, search),
  }
}
