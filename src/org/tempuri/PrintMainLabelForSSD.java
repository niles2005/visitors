
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
     * ��ȡthisSSDUnit���Ե�ֵ��
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
     * ����thisSSDUnit���Ե�ֵ��
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
