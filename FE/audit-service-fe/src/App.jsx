import { useAuditLogs } from './hooks/useAuditLogs'
import AuditLogTable from './components/AuditLogTable'

export default function App() {
  const {
    logs, page, setPage, totalPages,
    search, setSearch,
    autoRefresh, setAutoRefresh,
    loading, error, lastUpdated, refresh,
  } = useAuditLogs()

  return (
    <div className="wrap">
      <div className="top">
        <div>
          <div className="brand">
            <span className="dot" />
            <h1>Audit Log Viewer</h1>
          </div>
          <div className="sub">Kafka topic: audit-log · PRM audit-log-service</div>
        </div>
        <div className="status">
          {error ? (
            <span className="badge-error">✕ Không kết nối được API — {error}</span>
          ) : (
            <>
              trạng thái: <b>{loading ? 'đang tải…' : 'đã kết nối'}</b>
              {lastUpdated && <div>cập nhật lúc {lastUpdated.toLocaleTimeString('vi-VN')}</div>}
            </>
          )}
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Tìm theo action, entity, username…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={autoRefresh ? 'primary' : ''} onClick={() => setAutoRefresh((a) => !a)}>
          {autoRefresh ? 'Tự làm mới: Bật' : 'Tự làm mới: Tắt'}
        </button>
        <button onClick={refresh} disabled={loading}>Làm mới</button>
      </div>

      <div className="panel">
        <AuditLogTable logs={logs} error={error} />

        <div className="footer">
          <span>Trang {page + 1} / {Math.max(totalPages, 1)}</span>
          <div>
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Trước</button>{' '}
            <button onClick={() => setPage((p) => p + 1)} disabled={page + 1 >= totalPages}>Sau</button>
          </div>
        </div>
      </div>
    </div>
  )
}