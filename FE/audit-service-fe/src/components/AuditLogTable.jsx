function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s trước`
  if (diff < 3600) return `${Math.floor(diff / 60)}p trước`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h trước`
  return new Date(iso).toLocaleString('vi-VN')
}

export default function AuditLogTable({ logs, error }) {
  if (logs.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">∅</div>
        {error ? 'Không thể tải dữ liệu. Kiểm tra audit-log-service đã chạy chưa.' : 'Chưa có log nào.'}
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '140px' }}>Thời gian</th>
          <th style={{ width: '160px' }}>Action</th>
          <th style={{ width: '140px' }}>Entity</th>
          <th style={{ width: '120px' }}>User</th>
          <th>Chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((l) => (
          <tr key={l.id}>
            <td className="time">{timeAgo(l.receivedAt)}</td>
            <td className="action"><span>{l.action}</span></td>
            <td className="entity">{l.entity}</td>
            <td className="user">{l.username || '—'}</td>
            <td className="detail">{l.detail || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}