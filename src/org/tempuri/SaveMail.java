
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>anonymous complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
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
     * 获取strSubject属性的值。
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
     * 设置strSubject属性的值。
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
     * 获取emailIDs属性的值。
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
     * 设置emailIDs属性的值。
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
     * 获取mailBody属性的值。
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
     * 设置mailBody属性的值。
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
     * 获取emailCCs属性的值。
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
     * 设置emailCCs属性的值。
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
     * 获取priorityCode属性的值。
     * 
     */
    public long getPriorityCode() {
        return priorityCode;
    }

    /**
     * 设置priorityCode属性的值。
     * 
     */
    public void setPriorityCode(long value) {
        this.priorityCode = value;
    }

}
