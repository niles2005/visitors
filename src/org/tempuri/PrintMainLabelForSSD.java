
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
 *         &lt;element name="ThisSSDUnit" type="{http://tempuri.org/}SSDMainLabelParameters"/>
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
    "thisSSDUnit"
})
@XmlRootElement(name = "PrintMainLabelForSSD")
public class PrintMainLabelForSSD {

    @XmlElement(name = "ThisSSDUnit", required = true)
    protected SSDMainLabelParameters thisSSDUnit;

    /**
     * 获取thisSSDUnit属性的值。
     * 
     * @return
     *     possible object is
     *     {@link SSDMainLabelParameters }
     *     
     */
    public SSDMainLabelParameters getThisSSDUnit() {
        return thisSSDUnit;
    }

    /**
     * 设置thisSSDUnit属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link SSDMainLabelParameters }
     *     
     */
    public void setThisSSDUnit(SSDMainLabelParameters value) {
        this.thisSSDUnit = value;
    }

}
