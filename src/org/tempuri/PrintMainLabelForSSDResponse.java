
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
 *         &lt;element name="PrintMainLabelForSSDResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "printMainLabelForSSDResult"
})
@XmlRootElement(name = "PrintMainLabelForSSDResponse")
public class PrintMainLabelForSSDResponse {

    @XmlElement(name = "PrintMainLabelForSSDResult")
    protected String printMainLabelForSSDResult;

    /**
     * 获取printMainLabelForSSDResult属性的值。
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrintMainLabelForSSDResult() {
        return printMainLabelForSSDResult;
    }

    /**
     * 设置printMainLabelForSSDResult属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrintMainLabelForSSDResult(String value) {
        this.printMainLabelForSSDResult = value;
    }

}
