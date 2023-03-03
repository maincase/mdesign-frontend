import styled from "@emotion/styled";
import { Button, OutlinedInput } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./style/style.module.scss";
import React from "react";
import SelectElement from "../../elements/SelectElement";

const ColorButton = styled(Button)(() => ({
  color: "#000",
  backgroundColor: "#fff",
  width: "100%",
  marginTop: "10px",
  border: "1px solid",
  borderRadius: 12,
  "&:hover": {
    color: "#fff",
    borderColor: "#fff",
  },
}));

const UploadButton = styled(Button)(() => ({
  color: "#8c8c8c",
  height: "206px",
  width: "100%",
  backgroundColor: "#161616",
  borderRadius: 12,
  "&:hover": {
    backgroundColor: "#161616",
    opacity: 0.75,
  },
}));

const roomsList = [
  "Living room",
  "Bedroom",
  "Bath room",
  "Attic",
  "Kitchen",
  "Dining room",
  "Study room",
  "Home office",
  "Gaming room",
  "Outdoor pool area",
  "Outdoor patio",
  "Outdoor garden",
  "Meeting room",
  "Workshop",
  "Fitness gym",
  "Coffee shop",
  "Clothing store",
  "Walk in closet",
  "Toilet",
  "Restaurant",
  "Office",
  "Coworking space",
  "Hotel lobby",
  "Hotel room",
  "Hotel bathroom",
  "Exhibition space",
  "Onsen",
  "Mudroom",
  "Drop zone",
];

const modeList = [
  "Virtual staging (locks walls, slower)",
  "Interior design (more creative, fast)",
  "Freestyle (no image needed, very fast)",
];

const styleList = [
  "Easter",
  "Modern",
  "Minimalist",
  "Contemporary",
  "Scandinavian",
  "Interior AI",
  "Zen",
  "Midcentury modern",
  "Tropical",
  "Biophilic",
  "Industrial",
  "Art deco",
  "Farmhouse",
  "Rustic",
  "Bohemian",
  "Japanese design",
  "Vintage",
  "Coastal",
  "Cottagecore",
  "French country",
  "Art nouveau",
  "Cyberpunk",
  "Maximalist",
  "Gaming room",
  "Baroque",
  "Vaporwave",
  "Ski chalet",
  "Christmas",
  "Sketch",
  "Tribal",
  "Medieval",
  "Chinese New Year",
  "Halloween",
  "Neoclassic (Pro)",
];

const numberOfRendersList = [
  "1 render (fast)",
  "3 renders (slower) (Pro)",
  "6 renders (slow) (Pro)",
  "9 renders (very slow) (Pro)",
];

const resolutionsList = [
  "High (slow, takes 14s) (Pro)",
  "Low (fast, takes 7s)",
];

const privacyList = ["Public", "Private (Pro)"];

const NewRender = () => {
  return (
    <div className={styles.new_render_container}>
      <div className={styles.new_render_content}>
        <h3>Start using Interior AI for free</h3>
        <OutlinedInput
          placeholder="Your real email"
          style={{
            color: "#fff",
            backgroundColor: "#161616",
            border: "1px solid #ffffff33",
            width: "100%",
            borderRadius: 12,
          }}
        />
        <ColorButton sx={{ textTransform: "none" }}>
          Confirm your email to use Interior AI
        </ColorButton>
        <h3>Your current interior</h3>
        <UploadButton
          sx={{ textTransform: "none", border: "1px dashed grey" }}
          startIcon={<UploadIcon />}
        >
          Drop an image, tap to select, take a photo, or ⌘ + V
        </UploadButton>
        <p className={styles.sub_info}>
          Take a photo of your current room. For best results make sure it shows
          the entire room in a 90° straight angle facing a wall or window
          horizontally (click for example). Not from a corner or angled, and not
          a wide angle photo as it's trained on regular photos. The AI isn't
          great at angled pics (yet)! Uploads + renders are shown on site but
          auto deleted after 15 mins. To make 100% private HQ renders without
          deletion and watermark upgrade to Pro and you get your own private
          workspace.
        </p>
        <SelectElement selectList={roomsList} title={"ROOM"} />
        <SelectElement selectList={modeList} title={"MODE"} />
        <p className={styles.sub_info}>
          You get widely different results with each mode. Virtual Staging mode
          will auto detect the construction (like walls, ceiling, beams) and
          tries to avoid changing it, while Interior Design mode doesn't but
          gives you more creative ideas. A good idea is to use Interior Design
          mode and then Mix w/ Original to get the original auto masked
          background back.
        </p>
        <SelectElement selectList={styleList} title={"STYLE"} />
        <SelectElement
          selectList={numberOfRendersList}
          title={"NUMBER OF RENDERS"}
        />
        <SelectElement selectList={resolutionsList} title={"RESOLUTION"} />
        <SelectElement selectList={privacyList} title={"PRIVACY"} />
        <p>
          Tip: if you like a generated image, you can re-use it as an input for
          more results like it. If you like this, tweet me at @levelsio and
          check out my other AI projects Photo AI, Avatar AI and This House Does
          Not Exist.
        </p>
      </div>
      <div className={styles.new_render_button}>
        <ColorButton sx={{ textTransform: "none" }} style={{ margin: 0 }}>
          Render new idea
        </ColorButton>
      </div>
    </div>
  );
};

export default NewRender;
