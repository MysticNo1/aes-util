import CryptoJS from 'crypto-js/crypto-js'
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word, keyStr, ivStr) {
	const key = CryptoJS.enc.Utf8.parse(keyStr)
	const iv = CryptoJS.enc.Utf8.parse(ivStr)

	const src = CryptoJS.enc.Utf8.parse(word)
	const encrypted = CryptoJS.AES.encrypt(src, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt(word, keyStr, ivStr) {
	const key = CryptoJS.enc.Utf8.parse(keyStr)
	const iv = CryptoJS.enc.Utf8.parse(ivStr)
	const base64 = CryptoJS.enc.Base64.parse(word)
	const src = CryptoJS.enc.Base64.stringify(base64)

	const decrypt = CryptoJS.AES.decrypt(src, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
	return decryptedStr.toString()
}
