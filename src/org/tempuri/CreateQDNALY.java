
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
 *         &lt;element name="ThisQDN" type="{http://tempuri.org/}QDNAttributesALY"/>
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
    "thisQDN"
})
@XmlRootElement(name = "CreateQDN_ALY")
public class CreateQDNALY {

    @XmlElement(name = "ThisQDN", required = true)
    protected QDNAttributesALY thisQDN;

    /**
     * 获取thisQDN属性的值。
     * 
     * @return
     *     possible object is
     *     {@link QDNAttributesALY }
     *     
     */
    public QDNAttributesALY getThisQDN() {
        return thisQDN;
    }

    /**
     * 设置thisQDN属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link QDNAttributesALY }
     *     
     */
    public void setThisQDN(QDNAttributesALY value) {
        this.thisQDN = value;
    }

}
