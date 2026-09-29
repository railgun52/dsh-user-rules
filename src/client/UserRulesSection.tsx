import { useState, useEffect, useCallback } from 'react'
import { Button, IconPlusOutlineRegular, IconTrashOutlineRegular, Modal, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { UserRulesKey } from './locales.ts'
import styles from './UserRulesSection.module.css'

export interface UserRulesSectionInjected {
  load: () => string[]
  save: (rules: string[]) => Promise<void>
  t: (key: UserRulesKey) => string
}

export type UserRulesSectionProps = Partial<UserRulesSectionInjected>

export function UserRulesSection({ load, save, t: t_ }: UserRulesSectionProps) {
  const t = t_ ?? ((key: string) => key)
  const [rules, setRules] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)

  const loadConfig = useCallback(() => {
    setLoading(true)
    setError(null)
    try {
      setRules(load?.() ?? [])
    } catch (e) {
      setError(t('loadFailed'))
    } finally {
      setLoading(false)
    }
  }, [load, t])

  useEffect(() => { loadConfig() }, [loadConfig])

  const saveConfig = async (newRules: string[]) => {
    setSaving(true)
    setError(null)
    try {
      await save?.(newRules)
      setRules(newRules)
    } catch (e) {
      setError(t('saveFailed'))
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = () => {
    setEditText('')
    setEditIndex(null)
    setShowEditModal(true)
  }

  const handleEdit = (index: number) => {
    const rule = rules[index]
    if (rule === undefined) return
    setEditText(rule)
    setEditIndex(index)
    setShowEditModal(true)
  }

  const handleSave = async () => {
    const trimmed = editText.trim()
    if (!trimmed) return
    const newRules = [...rules]
    if (editIndex !== null) {
      newRules[editIndex] = trimmed
    } else {
      newRules.push(trimmed)
    }
    await saveConfig(newRules)
    setShowEditModal(false)
    setEditText('')
  }

  const handleDelete = async (index: number) => {
    const newRules = rules.filter((_, i) => i !== index)
    await saveConfig(newRules)
    setDeleteTarget(null)
  }

  if (loading) {
    return <div className={styles.section}><div className={styles.loading}>Loading...</div></div>
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.intro}>{t('intro')}</p>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.toolbar}>
        <Button onClick={handleAdd} disabled={saving}>
          <IconPlusOutlineRegular /> {t('add')}
        </Button>
      </div>

      {rules.length === 0 && (
        <div className={styles.empty}>{t('noRules')}</div>
      )}

      <div className={styles.list}>
        {rules.map((rule, i) => (
          <div key={i} className={styles.ruleCard}>
            <div className={styles.ruleText}>
              <Tooltip label={rule} side="top" disabled={rule.length <= 40}>
                <span style={{ cursor: 'default' }}>{rule}</span>
              </Tooltip>
            </div>
            <div className={styles.ruleActions}>
              <Button onClick={() => handleEdit(i)}>{t('edit')}</Button>
              <button className={styles.deleteBtn} onClick={() => setDeleteTarget(i)}>
                <IconTrashOutlineRegular />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <Modal
          open
          onClose={() => setShowEditModal(false)}
          title={editIndex !== null ? t('edit') : t('add')}
          closeLabel={t('close')}
          className={styles.dialogRules ?? ''}
          footer={(
            <>
              <Button onClick={handleSave} disabled={saving || !editText.trim()}>{t('save')}</Button>
              <Button onClick={() => setShowEditModal(false)}>{t('cancel')}</Button>
            </>
          )}
        >
          <div className={styles.modalBody}>
            <textarea
              className={styles.textarea}
              value={editText}
              onChange={e => setEditText(e.target.value)}
              placeholder={t('rulePlaceholder')}
              rows={10}
            />
          </div>
        </Modal>
      )}

      {deleteTarget !== null && (
        <Modal
          open
          onClose={() => setDeleteTarget(null)}
          title={t('remove')}
          closeLabel={t('close')}
          className={styles.dialogRules ?? ''}
          footer={(
            <>
              <Button onClick={() => handleDelete(deleteTarget)}>{t('remove')}</Button>
              <Button onClick={() => setDeleteTarget(null)}>{t('cancel')}</Button>
            </>
          )}
        >
          <div className={styles.modalBody}>
            <p>{t('deleteConfirm')}</p>
            <p>{t('deleteDescription')}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}
