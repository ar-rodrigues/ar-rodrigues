"use client";

import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, App } from "antd";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { RiCheckLine } from "react-icons/ri";

const { TextArea } = Input;

function Contact() {
  const { t, getSocialIcon } = useLanguage();
  const social = t("social");
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [isSuccess, setIsSuccess] = useState(false);
  const formStartTimeRef = useRef(Date.now());

  useEffect(() => {
    // Track when form component mounts
    formStartTimeRef.current = Date.now();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const formStartTime = formStartTimeRef.current;
      const submissionTime = Date.now();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          website: values.website || "", // Honeypot field
          formStartTime: formStartTime,
          submissionTime: submissionTime,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response received:", text.substring(0, 200));
        throw new Error("Error del servidor. Por favor, intenta de nuevo.");
      }

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Reset form start time for potential new submission
        formStartTimeRef.current = Date.now();
      } else {
        throw new Error(data.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      message.error(error.message || "Error al enviar el mensaje");
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    form.resetFields();
    formStartTimeRef.current = Date.now();
  };

  const { ref, isVisible, isLeaving } = useScrollAnimation({ 
    threshold: 0.1,
    triggerOnce: false 
  });

  return (
    <section
      id="contact-box"
      ref={ref}
      className={`contact-box scroll-fade-in ${isVisible ? "visible" : ""} ${isLeaving ? "leaving" : ""}`}
    >
      <div className="contact-header">
        <h3>{t("common.contact.title")}</h3>
        <p className="contact-subtitle">{t("common.contact.subtitle")}</p>
      </div>

      {isSuccess ? (
        <div className="contact-success-message">
          <div className="success-icon-wrapper">
            <RiCheckLine className="success-icon" />
          </div>
          <h3 className="success-title">{t("common.contact.successTitle")}</h3>
          <p className="success-description">
            {t("common.contact.successDescription")}
          </p>
          <div className="success-button-wrapper">
            <Button
              type="primary"
              onClick={handleSendAnother}
              className="contact-button-primary"
              size="large"
              block
            >
              {t("common.contact.sendAnother")}
            </Button>
          </div>
        </div>
      ) : (
        <Form
          form={form}
          name="contact"
          layout="vertical"
          onFinish={handleSubmit}
          className="contact-form"
          size="large"
          requiredMark={false}
        >
          {/* Honeypot field - hidden from users but visible to bots */}
          <Form.Item
            name="website"
            style={{ display: "none" }}
            className="honeypot-field"
          >
            <Input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
          </Form.Item>

          <Form.Item
            name="name"
            label={t("common.contact.nameLabel")}
            rules={[
              {
                required: true,
                message: t("common.contact.namePlaceholder"),
              },
            ]}
          >
            <Input
              placeholder={t("common.contact.namePlaceholder")}
              name="name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={t("common.contact.emailLabel")}
            rules={[
              {
                required: true,
                type: "email",
                message: "Por favor ingresa un email válido",
              },
            ]}
          >
            <Input
              type="email"
              placeholder={t("common.contact.emailPlaceholder")}
              name="email"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label={t("common.contact.messageLabel")}
            rules={[
              {
                required: true,
                message: t("common.contact.messagePlaceholder"),
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder={t("common.contact.messagePlaceholder")}
              name="message"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="contact-button-primary"
              size="large"
            >
              {t("common.contact.submit")}
            </Button>
          </Form.Item>
        </Form>
      )}

      <div className="social-contact-wrapper">
        <ul className="social-contact">
          {social.map((socialIcon) => {
            const { id, url, icon, name } = socialIcon;
            const IconComponent = getSocialIcon(icon);
            return (
              <li key={id}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                >
                  {IconComponent && <IconComponent />}
                </a>
                <h4>{name}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
