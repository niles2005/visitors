
package org.tempuri;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="getStatusAboutWorkOrderMaterialVerificationResult" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
    "getStatusAboutWorkOrderMaterialVerificationResult"
})
@XmlRootElement(name = "getStatusAboutWorkOrderMaterialVerificationResponse")
public class GetStatusAboutWorkOrderMaterialVerificationResponse {

    protected String getStatusAboutWorkOrderMaterialVerificationResult;

    /**
     * ��ȡgetStatusAboutWorkOrderMaterialVerificationResult���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGetStatusAboutWorkOrderMaterialVerificationResult() {
        return getStatusAboutWorkOrderMaterialVerificationResult;
    }

    /**
     * ����getStatusAboutWorkOrderMaterialVerificationResult���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGetStatusAboutWorkOrderMaterialVerificationResult(String value) {
        this.getStatusAboutWorkOrderMaterialVerificationResult = value;
    }

}
