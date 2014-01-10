
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
 *         &lt;element name="ProcessRejectTransactionForSSDResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "processRejectTransactionForSSDResult"
})
@XmlRootElement(name = "ProcessRejectTransactionForSSDResponse")
public class ProcessRejectTransactionForSSDResponse {

    @XmlElement(name = "ProcessRejectTransactionForSSDResult")
    protected String processRejectTransactionForSSDResult;

    /**
     * 获取processRejectTransactionForSSDResult属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProcessRejectTransactionForSSDResult() {
        return processRejectTransactionForSSDResult;
    }

    /**
     * 设置processRejectTransactionForSSDResult属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProcessRejectTransactionForSSDResult(String value) {
        this.processRejectTransactionForSSDResult = value;
    }

}
