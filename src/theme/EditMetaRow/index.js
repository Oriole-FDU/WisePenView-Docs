import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {Check, Copy, Pencil, X} from 'lucide-react';
import LastUpdated from '@theme/LastUpdated';
import styles from './styles.module.css';

const COPY_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
};

function CopyPageLink() {
  const [status, setStatus] = useState(COPY_STATUS.IDLE);
  const resetTimer = useRef(null);

  useEffect(
    () => () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  const updateStatus = useCallback((nextStatus) => {
    setStatus(nextStatus);
    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }
    resetTimer.current = window.setTimeout(() => setStatus(COPY_STATUS.IDLE), 1800);
  }, []);

  const handleCopy = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!copied) {
          throw new Error('Copy command failed');
        }
      }
      updateStatus(COPY_STATUS.SUCCESS);
    } catch {
      updateStatus(COPY_STATUS.ERROR);
    }
  }, [updateStatus]);

  const content = {
    [COPY_STATUS.IDLE]: {Icon: Copy, label: '复制链接'},
    [COPY_STATUS.SUCCESS]: {Icon: Check, label: '链接已复制'},
    [COPY_STATUS.ERROR]: {Icon: X, label: '复制失败'},
  }[status];
  const {Icon, label} = content;

  return (
    <button
      type="button"
      className={clsx(styles.action, styles.copyAction)}
      onClick={handleCopy}
      aria-live="polite">
      <Icon size={15} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export default function EditMetaRow({
  className,
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
}) {
  const hasLastUpdated = lastUpdatedAt || lastUpdatedBy;

  return (
    <div className={clsx(styles.metaRow, className)}>
      {hasLastUpdated && (
        <div className={styles.lastUpdated}>
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        </div>
      )}
      <div className={styles.actions}>
        {editUrl && (
          <a
            className={styles.action}
            href={editUrl}
            target="_blank"
            rel="noreferrer">
            <Pencil size={15} aria-hidden="true" />
            <span>编辑此页</span>
          </a>
        )}
        <CopyPageLink />
      </div>
    </div>
  );
}
