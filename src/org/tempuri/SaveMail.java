
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>anonymous complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="strSubject" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EmailIDs" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MailBody" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="EmailCCs" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PriorityCode" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "strSubject",
    "emailIDs",
    "mailBody",
    "emailCCs",
    "priorityCode"
})
@XmlRootElement(name = "SaveMail")
public class SaveMail {

    protected String strSubject;
    @XmlElement(name = "EmailIDs")
    protected String emailIDs;
    @XmlElement(name = "MailBody")
    protected String mailBody;
    @XmlElement(name = "EmailCCs")
    protected String emailCCs;
    @XmlElement(name = "PriorityCode")
    protected long priorityCode;

    /**
     * ��ȡstrSubject���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrSubject() {
        return strSubject;
    }

    /**
     * ����strSubject���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrSubject(String value) {
        this.strSubject = value;
    }

    /**
     * ��ȡemailIDs���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEmailIDs() {
        return emailIDs;
    }

    /**
     * ����emailIDs���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEmailIDs(String value) {
        this.emailIDs = value;
    }

    /**
     * ��ȡmailBody���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMailBody() {
        return mailBody;
    }

    /**
     * ����mailBody���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMailBody(String value) {
        this.mailBody = value;
    }

    /**
     * ��ȡemailCCs���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEmailCCs() {
        return emailCCs;
    }

    /**
     * ����emailCCs���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEmailCCs(String value) {
        this.emailCCs = value;
    }

    /**
     * ��ȡpriorityCode���Ե�ֵ��
     * 
     */
    public long getPriorityCode() {
        return priorityCode;
    }

    /**
     * ����priorityCode���Ե�ֵ��
     * 
     */
    public void setPriorityCode(long value) {
        this.priorityCode = value;
    }

}
