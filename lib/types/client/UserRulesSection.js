import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { Button, IconPlusOutlineRegular, IconTrashOutlineRegular, Modal, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives';
import styles from './UserRulesSection.module.css';
export function UserRulesSection({ load, save, t: t_ }) {
    const t = t_ ?? ((key) => key);
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const loadConfig = useCallback(() => {
        setLoading(true);
        setError(null);
        try {
            setRules(load?.() ?? []);
        }
        catch (e) {
            setError(t('loadFailed'));
        }
        finally {
            setLoading(false);
        }
    }, [load, t]);
    useEffect(() => { loadConfig(); }, [loadConfig]);
    const saveConfig = async (newRules) => {
        setSaving(true);
        setError(null);
        try {
            await save?.(newRules);
            setRules(newRules);
        }
        catch (e) {
            setError(t('saveFailed'));
        }
        finally {
            setSaving(false);
        }
    };
    const handleAdd = () => {
        setEditText('');
        setEditIndex(null);
        setShowEditModal(true);
    };
    const handleEdit = (index) => {
        const rule = rules[index];
        if (rule === undefined)
            return;
        setEditText(rule);
        setEditIndex(index);
        setShowEditModal(true);
    };
    const handleSave = async () => {
        const trimmed = editText.trim();
        if (!trimmed)
            return;
        const newRules = [...rules];
        if (editIndex !== null) {
            newRules[editIndex] = trimmed;
        }
        else {
            newRules.push(trimmed);
        }
        await saveConfig(newRules);
        setShowEditModal(false);
        setEditText('');
    };
    const handleDelete = async (index) => {
        const newRules = rules.filter((_, i) => i !== index);
        await saveConfig(newRules);
        setDeleteTarget(null);
    };
    if (loading) {
        return _jsx("div", { className: styles.section, children: _jsx("div", { className: styles.loading, children: "Loading..." }) });
    }
    return (_jsxs("div", { className: styles.section, children: [_jsxs("div", { className: styles.header, children: [_jsx("h2", { className: styles.title, children: t('title') }), _jsx("p", { className: styles.intro, children: t('intro') })] }), error && _jsx("div", { className: styles.error, children: error }), _jsx("div", { className: styles.toolbar, children: _jsxs(Button, { onClick: handleAdd, disabled: saving, children: [_jsx(IconPlusOutlineRegular, {}), " ", t('add')] }) }), rules.length === 0 && (_jsx("div", { className: styles.empty, children: t('noRules') })), _jsx("div", { className: styles.list, children: rules.map((rule, i) => (_jsxs("div", { className: styles.ruleCard, children: [_jsx("div", { className: styles.ruleText, children: _jsx(Tooltip, { label: rule, side: "top", disabled: rule.length <= 40, children: _jsx("span", { style: { cursor: 'default' }, children: rule }) }) }), _jsxs("div", { className: styles.ruleActions, children: [_jsx(Button, { onClick: () => handleEdit(i), children: t('edit') }), _jsx("button", { className: styles.deleteBtn, onClick: () => setDeleteTarget(i), children: _jsx(IconTrashOutlineRegular, {}) })] })] }, i))) }), showEditModal && (_jsx(Modal, { open: true, onClose: () => setShowEditModal(false), title: editIndex !== null ? t('edit') : t('add'), closeLabel: t('close'), className: styles.dialogRules ?? '', footer: (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: handleSave, disabled: saving || !editText.trim(), children: t('save') }), _jsx(Button, { onClick: () => setShowEditModal(false), children: t('cancel') })] })), children: _jsx("div", { className: styles.modalBody, children: _jsx("textarea", { className: styles.textarea, value: editText, onChange: e => setEditText(e.target.value), placeholder: t('rulePlaceholder'), rows: 10 }) }) })), deleteTarget !== null && (_jsx(Modal, { open: true, onClose: () => setDeleteTarget(null), title: t('remove'), closeLabel: t('close'), className: styles.dialogRules ?? '', footer: (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => handleDelete(deleteTarget), children: t('remove') }), _jsx(Button, { onClick: () => setDeleteTarget(null), children: t('cancel') })] })), children: _jsxs("div", { className: styles.modalBody, children: [_jsx("p", { children: t('deleteConfirm') }), _jsx("p", { children: t('deleteDescription') })] }) }))] }));
}
//# sourceMappingURL=UserRulesSection.js.map