
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
 *         &lt;element name="MoveWholeBoxForSSDResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "moveWholeBoxForSSDResult"
})
@XmlRootElement(name = "MoveWholeBoxForSSDResponse")
public class MoveWholeBoxForSSDResponse {

    @XmlElement(name = "MoveWholeBoxForSSDResult")
    protected String moveWholeBoxForSSDResult;

    /**
     * ��ȡmoveWholeBoxForSSDResult���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMoveWholeBoxForSSDResult() {
        return moveWholeBoxForSSDResult;
    }

    /**
     * ����moveWholeBoxForSSDResult���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMoveWholeBoxForSSDResult(String value) {
        this.moveWholeBoxForSSDResult = value;
    }

}
